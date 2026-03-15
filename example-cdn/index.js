import { JPTEEngine } from 'https://cdn.jsdelivr.net/gh/slp-222-swimin/Japanese-Type-Engine-v1-stable/src/index.js';

const sentences = [
  { s: "昨日、東京へ行った。", k: "きのうとうきょうへいった" },
  { s: "次世代のタイピング体験", k: "じせだいのたいぴんぐたいけん" },
  { s: "グラフ理論による経路探索", k: "ぐらふりろんによるけいろたんさく" },
  { s: "しんぶんしをよむ。", k: "しんぶんしをよむ" },
  { s: "圧倒的な速度で打鍵する", k: "あっとうてきなそくどでだけんする" }
];

let engine;
let currentSentenceIdx = 0;
let isPlaying = false;

// UI Elements
const uiInstructions = document.getElementById('instructions');
const uiGameContent = document.getElementById('game-content');
const uiSentence = document.getElementById('sentence');
const uiFurigana = document.getElementById('furigana');
const uiTyped = document.getElementById('typed-romaji');
const uiExpected = document.getElementById('expected-romaji');
const uiProgressBar = document.getElementById('progress-bar');

const uiKpm = document.getElementById('ui-kpm');
const uiAccuracy = document.getElementById('ui-accuracy');
const uiCombo = document.getElementById('ui-combo');
const effectLayer = document.getElementById('effect-layer');

function init() {
  engine = new JPTEEngine();

  engine.on('correct', (res) => {
    updateDisplay(res);
  });

  engine.on('mistake', (res) => {
    triggerMistakeEffect();
  });

  engine.on('complete', (stats) => {
    nextSentence();
  });

  window.addEventListener('keydown', handleGlobalKeydown);
}

function handleGlobalKeydown(e) {
  if (e.ctrlKey || e.metaKey || e.altKey) return;

  if (!isPlaying) {
    if (e.key === ' ') {
      startGame();
    }
    return;
  }

  // Prevent default browser scrolling etc for single keys
  if (e.key.length === 1 || e.key === 'Backspace') {
    e.preventDefault();
  }

  if (e.key === 'Backspace') {
    engine.backspace();
    // Re-render
    const act = engine.activeStates[0] ? engine.activeStates[0].edge.startIndex : 0;
    const defaultRes = {
        currentBuffer: engine.currentBuffer,
        remainingKana: engine.currentKana.substring(act)
    };
    updateDisplay(defaultRes);
    return;
  }

  if (e.key.length === 1) {
    engine.input(e.key);
    updateStatsUI();
  }
}

function startGame() {
  isPlaying = true;
  uiInstructions.classList.add('hidden');
  uiGameContent.classList.remove('hidden');
  engine.reset();
  currentSentenceIdx = 0;
  loadSentence(currentSentenceIdx);
  updateStatsUI();
}

function nextSentence() {
  currentSentenceIdx++;
  if (currentSentenceIdx >= sentences.length) {
    // Game Over
    isPlaying = false;
    uiInstructions.textContent = "Finished! Press Space to Restart";
    uiInstructions.classList.remove('hidden');
    uiGameContent.classList.add('hidden');
  } else {
    loadSentence(currentSentenceIdx);
  }
}

function loadSentence(idx) {
  const data = sentences[idx];
  uiSentence.textContent = data.s;
  uiFurigana.textContent = data.k;
  engine.newWord(data.k);
  
  // Display initial state: Empty buffer + shortest path for the whole kana
  const initialRomaji = engine.getShortestRemainingRomaji();
  uiTyped.textContent = "";
  uiExpected.textContent = initialRomaji;
  uiProgressBar.style.width = "0%";
}

function updateDisplay(res) {
  uiTyped.textContent = res.currentBuffer;
  uiExpected.textContent = res.remainingRomaji || "";
  
  // Calculate progress
  const total = engine.currentKana.length;
  const progress = (res.segmentIndex / total) * 100;
  uiProgressBar.style.width = `${progress}%`;
}

function triggerMistakeEffect() {
  uiGameContent.classList.remove('shake');
  void uiGameContent.offsetWidth; // trigger reflow
  uiGameContent.classList.add('shake');

  const flash = document.createElement('div');
  flash.className = 'mistake-flash';
  document.body.appendChild(flash);
  setTimeout(() => flash.remove(), 300);
}

function updateStatsUI() {
  uiKpm.textContent = engine.stats.kpm;
  uiAccuracy.textContent = (engine.stats.accuracy * 100).toFixed(1) + '%';
  uiCombo.textContent = engine.stats.currentCombo;
  
  if (engine.stats.currentCombo > 0 && engine.stats.currentCombo % 10 === 0) {
      uiCombo.style.color = '#fff';
      uiCombo.style.textShadow = '0 0 10px #66fcf1';
      setTimeout(() => {
          uiCombo.style.color = '';
          uiCombo.style.textShadow = '';
      }, 300);
  }
}

document.addEventListener('DOMContentLoaded', init);
