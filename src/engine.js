import { ROMAN_MAP } from './romanMap.js';

export class JPTEEngine {
  constructor(options = {}) {
    this.romanMap = options.romanMap || ROMAN_MAP;
    
    this.options = {
      strictNn: true,
      allowBackspace: true,
      ignoreSpace: true,
      ...(options.options || {})
    };

    this.listeners = {
      correct: [],
      mistake: [],
      complete: []
    };

    this.reset();
  }

  // --- Core Methods ---
  
  newWord(kana) {
    this.resetGraphState();
    this.currentKana = kana;
    this.graph = this.buildGraph(kana);
    this.initStates();
  }

  initStates() {
    this.activeStates = this.graph.map(edge => ({
      edge: edge,
      charIndex: 0,
      matchedRomaji: "",
      history: [] // For backspace
    }));
    this.currentBuffer = "";
  }

  input(key) {
    if (!this.graph) return null;

    if (this.options.ignoreSpace && key === ' ') return null;
    
    if (this.stats.kpm === 0 && this.stats.correctCount === 0 && this.stats.mistakeCount === 0) {
      this.startTime = Date.now();
    }

    let nextStates = [];
    let isMistake = true;
    let expectedKeys = new Set();
    let isComplete = false;
    let newBuffer = "";

    // Evaluate all active states
    for (const state of this.activeStates) {
      if (!state.edge.next) continue; // Already at end...? Should not happen if filtered

      const expectedChar = state.edge.romaji[state.charIndex];
      expectedKeys.add(expectedChar);

      if (key === expectedChar) {
        isMistake = false;
        const newState = {
          edge: state.edge,
          charIndex: state.charIndex + 1,
          matchedRomaji: state.matchedRomaji + key,
          history: [...state.history, { edge: state.edge, charIndex: state.charIndex }]
        };

        newBuffer = newState.matchedRomaji;

        // Check if edge is completely traversed
        if (newState.charIndex === state.edge.romaji.length) {
          if (state.edge.next.length === 1 && state.edge.next[0].next === null) {
            // Reached the end node!
            isComplete = true;
          } else {
            // Branch to all next edges
            for (const nextEdge of state.edge.next) {
              nextStates.push({
                edge: nextEdge,
                charIndex: 0,
                matchedRomaji: newState.matchedRomaji,
                history: newState.history
              });
            }
          }
        } else {
          // Stay on current edge
          nextStates.push(newState);
        }
      }
    }

    if (isMistake) {
      this.stats.mistakeCount++;
      this.stats.currentCombo = 0;
      this.updateAccuracy();
      
      const result = {
        type: "mistake",
        char: key,
        currentBuffer: this.currentBuffer,
        remainingKana: this.getRemainingKana(),
        segmentIndex: this.getSegmentIndex(),
        isFinished: false,
        expectedKeys: Array.from(expectedKeys)
      };
      
      this.trigger('mistake', result);
      return result;
    }

    // Correct hit
    this.stats.correctCount++;
    this.stats.currentCombo++;
    if (this.stats.currentCombo > this.stats.maxCombo) {
      this.stats.maxCombo = this.stats.currentCombo;
    }
    this.updateAccuracy();
    this.updateKpm();
    
    this.activeStates = nextStates;
    this.currentBuffer = newBuffer;

    if (isComplete) {
      this.activeStates = [];
      const result = {
        type: "complete",
        char: key,
        currentBuffer: this.currentBuffer,
        remainingKana: "",
        remainingRomaji: "",
        segmentIndex: this.currentKana.length,
        isFinished: true,
        expectedKeys: []
      };
      
      const statsCopy = { ...this.stats };
      this.trigger('correct', result);
      this.trigger('complete', statsCopy);
      return result;
    } else {
      const result = {
        type: "correct",
        char: key,
        currentBuffer: this.currentBuffer,
        remainingKana: this.getRemainingKana(),
        remainingRomaji: this.getShortestRemainingRomaji(),
        segmentIndex: this.getSegmentIndex(),
        isFinished: false,
        expectedKeys: this.getExpectedKeys()
      };
      
      this.trigger('correct', result);
      return result;
    }
  }

  getShortestRemainingRomaji() {
    if (this.activeStates.length === 0) return "";
    
    // Find the shortest path from the current active states.
    // For simplicity, we can just pick the first active state and find the shortest path from its current edge.
    // However, it's better to find the global shortest path among all active states.
    
    let shortestTotal = null;
    let bestRomaji = "";

    for (const state of this.activeStates) {
      const remainingOnEdge = state.edge.romaji.substring(state.charIndex);
      const restShortest = this.getShortestPathFromNodes(state.edge.next);
      const total = remainingOnEdge + restShortest;
      
      if (shortestTotal === null || total.length < shortestTotal.length) {
        shortestTotal = total;
        bestRomaji = total;
      }
    }

    return bestRomaji;
  }

  getShortestPathFromNodes(nodes) {
    if (!nodes || nodes.length === 0) return "";
    if (nodes.length === 1 && nodes[0].next === null) return ""; // End node

    let shortest = null;
    for (const node of nodes) {
      const path = node.romaji + this.getShortestPathFromNodes(node.next);
      if (shortest === null || path.length < shortest.length) {
        shortest = path;
      }
    }
    return shortest || "";
  }

  getExpectedKeys() {
    const keys = new Set();
    for (const state of this.activeStates) {
      keys.add(state.edge.romaji[state.charIndex]);
    }
    return Array.from(keys);
  }

  getSegmentIndex() {
    if (this.activeStates.length === 0) return this.currentKana.length;
    // We base it on the state that has consumed the LEAST characters to be conservative?
    // Or just shortest path. Let's just look at the first active state.
    return this.activeStates[0].edge.startIndex;
  }

  getRemainingKana() {
    if (this.activeStates.length === 0) return "";
    // For now, base it on the first active state (which represents one viable path)
    const idx = this.activeStates[0].edge.startIndex;
    return this.currentKana.substring(idx);
  }

  backspace() {
    if (!this.options.allowBackspace || this.currentBuffer.length === 0) return;
    
    // We need to restore `activeStates` to the previous history step.
    // Wait, history is stored inside each state. But what if we branch? We just pop from the history of ALL surviving states?
    // Actually, `activeStates` might only have the states that survived the LAST keystroke.
    // To support perfect backspace, we should store a global history of `activeStates` per keystroke.
    // Let's implement global history.
    if (!this.globalHistory) this.globalHistory = [];
    if (this.globalHistory.length > 0) {
      const prev = this.globalHistory.pop();
      this.activeStates = prev.states;
      this.currentBuffer = prev.buffer;
    }
  }

  // --- Event Handling ---

  on(eventName, callback) {
    if (this.listeners[eventName]) {
      this.listeners[eventName].push(callback);
    }
  }

  trigger(eventName, data) {
    if (this.listeners[eventName]) {
      for (const cb of this.listeners[eventName]) {
        cb(data);
      }
    }
  }

  // --- Internal Utilities ---

  resetGraphState() {
     this.globalHistory = [];
  }

  reset() {
    this.currentKana = "";
    this.graph = null;
    this.activeStates = [];
    this.globalHistory = [];
    this.currentBuffer = "";
    this.stats = {
      kpm: 0,
      accuracy: 0,
      correctCount: 0,
      mistakeCount: 0,
      maxCombo: 0,
      currentCombo: 0
    };
    this.startTime = null;
  }

  updateAccuracy() {
    const total = this.stats.correctCount + this.stats.mistakeCount;
    if (total === 0) {
       this.stats.accuracy = 0;
    } else {
       this.stats.accuracy = this.stats.correctCount / total;
    }
  }

  updateKpm() {
    if (!this.startTime) return;
    const elapsedMinutes = (Date.now() - this.startTime) / 60000;
    if (elapsedMinutes > 0) {
      this.stats.kpm = Math.floor(this.stats.correctCount / elapsedMinutes);
    }
  }

  buildGraph(kana) {
    const memo = new Map();

    const parse = (index) => {
      if (index === kana.length) {
        return [{ romaji: "", kana: "", startIndex: index, endIndex: index, next: null }];
      }
      if (memo.has(index)) return memo.get(index);

      const paths = [];

      for (let len = 2; len >= 1; len--) {
        if (index + len <= kana.length) {
          const chunk = kana.substring(index, index + len);
          if (this.romanMap[chunk]) {
            const nextNodes = parse(index + len);
            for (const r of this.romanMap[chunk]) {
              paths.push({
                romaji: r,
                kana: chunk,
                startIndex: index,
                endIndex: index + len,
                next: nextNodes
              });
            }
          }
        }
      }

      if (kana[index] === 'っ' && index + 1 < kana.length) {
        for (let len = 2; len >= 1; len--) {
          if (index + 1 + len <= kana.length) {
            const nextChunk = kana.substring(index + 1, index + 1 + len);
            if (this.romanMap[nextChunk]) {
              const nextNodes = parse(index + 1 + len);
              for (const r of this.romanMap[nextChunk]) {
                const firstChar = r[0];
                if (!['a', 'i', 'u', 'e', 'o', 'n'].includes(firstChar)) {
                  paths.push({
                    romaji: firstChar + r,
                    kana: 'っ' + nextChunk,
                    startIndex: index,
                    endIndex: index + 1 + len,
                    next: nextNodes
                  });
                }
              }
            }
          }
        }
      }

      if (kana[index] === 'ん') {
        let allowSingleN = true;
        if (index + 1 < kana.length) {
          let startsWithVowelOrY = false;
          for (let len = 2; len >= 1; len--) {
            if (index + 1 + len <= kana.length) {
              const nc = kana.substring(index + 1, index + 1 + len);
              if (this.romanMap[nc]) {
                for (const r of this.romanMap[nc]) {
                  if (['a', 'i', 'u', 'e', 'o', 'y'].includes(r[0])) {
                    startsWithVowelOrY = true;
                  }
                }
              }
            }
          }
          if (startsWithVowelOrY) allowSingleN = false;
        } else {
          if (this.options.strictNn) allowSingleN = false;
        }

        if (allowSingleN) {
          paths.push({
            romaji: 'n',
            kana: 'ん',
            startIndex: index,
            endIndex: index + 1,
            next: parse(index + 1)
          });
        }
      }

      memo.set(index, paths);
      return paths;
    };

    return parse(0);
  }
}

