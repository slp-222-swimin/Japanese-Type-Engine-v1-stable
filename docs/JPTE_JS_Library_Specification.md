# **📦 JPTE (Japanese Type Engine) v1(Stable) JS Library Specification**

#### ~ フォームに依存しない、次世代日本語タイピングエンジン SDK 仕様書 ~

## **🚀 1\. 概要 (Overview)**

**JPTE (ジェプト)** は、ブラウザ標準のフォーム挙動を完全に排し、JavaScriptで生のキー入力を解析・照合することで、究極のタイピング体験を提供するロジックコア・ライブラリです。

### **🎯 ライブラリの担当範囲**

* **Roman Map 管理:** 膨大なローマ字変換パターンの保持と拡張。  
* **グラフ生成:** 一文全体の「すべての正解パス」を網羅した有向グラフの動的構築。  
* **入力判定:** keydown イベントから渡されたキーとグラフの前方一致（Prefix Match）照合。  
* **統計算出:** KPM、正確性、コンボ数などの競技タイピング指標のリアルタイム計算。

## **🛠 2\. セットアップ (Integration)**

### **クラスの初期化**

```javascript
import { JPTEEngine } from '@jpte/core';

const engine = new JPTEEngine({  
  romanMap: CUSTOM_ROMAN_MAP, // 任意のマスタで上書き可能  
  options: {  
    strictNn: true,           // 文末の「ん」に「nn」を強制するか  
    allowBackspace: true,     // バッファの巻き戻しを許可するか  
    ignoreSpace: true         // スペース入力を無視するか  
  }  
});
```

## **⚙️ 3\. コアメソッド (Core Methods)**

### **3.1 newWord(kana) \- グラフの生成**

アプリケーション側で管理している「かな」文字列を渡し、判定用グラフを再構築します。

```javascript
// アプリケーション側のデータから「かな」を抽出して渡す  
const currentQuestion = {  
  sentence: "昨日、東京へ行った。",  
  kana: "きのうとうきょうへいった"   
};

try {  
  engine.newWord(currentQuestion.kana);   
} catch (e) {  
  console.error("無効な文字が含まれています:", e.message);  
}
```

### **3.2 input(key) \- 入力照合**

ユーザーのキー入力をエンジンに渡し、即座に判定結果を取得します。

```javascript
window.addEventListener('keydown', (e) => {  
  if (e.ctrlKey || e.metaKey) return;   
    
  // Backspaceの処理  
  if (e.key === 'Backspace' && engine.options.allowBackspace) {  
    engine.backspace();  
    return;  
  }

  const result = engine.input(e.key);  
  // result.type: 'correct' | 'mistake' | 'complete'  
});
```

## **📂 4\. 統合変換マスタ (ROMAN\_MAP)**

```javascript
/**  
 * JPTE 統合マスタ  
 * 「かな」: [パターン配列]  
 */  
const ROMAN_MAP = {  
  "あ": ["a"], "い": ["i"], "う": ["u"], "え": ["e"], "お": ["o"],  
  "ぁ": ["xa", "la"], "ぃ": ["xi", "li"], "ぅ": ["xu", "lu"], "ぇ": ["xe", "le"], "ぉ": ["xo", "lo"],  
  "か": ["ka"], "き": ["ki"], "く": ["ku"], "け": ["ke"], "こ": ["ko"],  
  "が": ["ga"], "ぎ": ["gi"], "ぐ": ["gu"], "げ": ["ge"], "ご": ["go"],  
  "さ": ["sa"], "し": ["si", "shi"], "す": ["su"], "せ": ["se"], "そ": ["so"],  
  "ざ": ["za"], "じ": ["zi", "ji"], "ず": ["zu"], "ぜ": ["ze"], "ぞ": ["zo"],  
  "た": ["ta"], "ち": ["ti", "chi"], "つ": ["tu", "tsu"], "て": ["te"], "と": ["to"],  
  "だ": ["da"], "ぢ": ["di"], "づ": ["du"], "で": ["de"], "ど": ["do"],  
  "っ": ["xtu", "ltu", "xtsu"],  
  "な": ["na"], "に": ["ni"], "ぬ": ["nu"], "ね": ["ne"], "の": ["no"],  
  "は": ["ha"], "ひ": ["hi"], "ふ": ["fu", "hu"], "へ": ["he"], "ほ": ["ho"],  
  "ば": ["ba"], "び": ["bi"], "ぶ": ["bu"], "べ": ["be"], "ぼ": ["bo"],  
  "ぱ": ["pa"], "ぴ": ["pi"], "ぷ": ["pu"], "ぺ": ["po"], "ぽ": ["po"],  
  "ま": ["ma"], "み": ["mi"], "む": ["mu"], "め": ["me"], "も": ["mo"],  
  "や": ["ya"], "ゆ": ["yu"], "よ": ["yo"],  
  "ゃ": ["xya", "lya"], "ゅ": ["xyu", "lyu"], "ょ": ["xyo", "lyo"],  
  "ら": ["ra"], "り": ["ri"], "る": ["ru"], "れ": ["re"], "ろ": ["ro"],  
  "わ": ["wa"], "を": ["wo"], "ん": ["nn", "n", "xn"],  
  "ゎ": ["xwa", "lwa"],  
  "きゃ": ["kya"], "きゅ": ["kyu"], "きょ": ["kyo"],  
  "ぎゃ": ["gya"], "ぎゅ": ["gyu"], "ぎょ": ["gyo"],  
  "しゃ": ["sya", "sha"], "しゅ": ["syu", "shu"], "しょ": ["syo", "sho"],  
  "じゃ": ["zya", "ja"], "じゅ": ["zyu", "ja"], "じょ": ["zyo", "jo"],  
  "ちゃ": ["tya", "cha"], "ちゅ": ["tyu", "chu"], "ちょ": ["tyo", "cho"],  
  "にゃ": ["nya"], "にゅ": ["nyu"], "にょ": ["nyo"],  
  "ひゃ": ["hya"], "ひゅ": ["hyu"], "ひょ": ["hyo"],  
  "びゃ": ["bya"], "びゅ": ["byu"], "びょ": ["byo"],  
  "ぴゃ": ["pya"], "ぴゅ": ["pyu"], "ぴょ": ["pyo"],  
  "みゃ": ["mya"], "みゅ": ["myu"], "みょ": ["myo"],  
  "りゃ": ["rya"], "りゅ": ["ryu"], "りょ": ["ryo"],  
  "うぃ": ["wi"], "うぇ": ["we"], "うぉ": ["wo"],  
  "ゔぁ": ["va"], "ゔぃ": ["vi"], "ゔ": ["vu"], "ゔぇ": ["ve"], "ゔぉ": ["vo"],  
  "しぇ": ["she", "sye"], "じぇ": ["je", "zye"], "ちぇ": ["che", "tye"],  
  "てぃ": ["thi"], "てぇ": ["the"], "とぅ": ["twu"],  
  "でぃ": ["dhi"], "でぇ": ["dhe"], "どぅ": ["dwu"],  
  "ふぁ": ["fa"], "ふぃ": ["fi"], "ふぇ": ["fe"], "ふぉ": ["fo"], "ふゅ": ["fyu"],  
  "いぇ": ["ye"], "つぁ": ["tsa"], "つぃ": ["tsi"], "つぇ": ["tse"], "つぉ": ["tso"],  
  "ー": ["-"], "、": [","], "。": ["."], " ": [" "], "！": ["!"], "？": ["?"]  
};
```

## **💡 5\. パス分岐システム (Path Branching System)**

### **5.1 子音重複のルール（促音処理）**

「っ」の直後に有効な子音（a, i, u, e, o, n 以外）が続く場合、自動的にその子音を重ねたパス（tt, kk, ff 等）を動的に生成します。

### **5.2 「ん」の自動解決**

「ん」の次の文字が母音・y 以外であるルートにおいて、単発の n を正解パスとして許容します。

## **📊 6\. API リファレンス (API Reference)**

### **6.1 InputResult オブジェクト**

```javascript
{  
  "type": "correct" | "mistake" | "complete",  
  "char": "k",                 // 入力された文字  
  "currentBuffer": "toukyou",  // 現在確定しているローマ字列  
  "remainingKana": "へいった",  // 残りのひらがな（最短パス基準）  
  "segmentIndex": 2,           // 現在のセグメント位置  
  "isFinished": false,         // 全入力完了フラグ  
  "expectedKeys": ["a", "i"]   // ミス時に期待されていたキーのリスト  
}
```

### **6.2 イベントシステム**

```javascript
engine.on('correct', (data) => { /* 打鍵音の再生など */ });  
engine.on('mistake', (data) => { /* ミスエフェクトなど */ });  
engine.on('complete', (stats) => { /* リザルト表示など */ });
```

## **📈 7\. 統計指標 (Metrics)**

1. **KPM (Keys Per Minute):** 打鍵速度。最初の正解打鍵から計測開始。  
2. **Accuracy:** 正解率（正確打鍵数 / (正確打鍵数 + ミス数)）。  
3. **Max Combo:** 連続正解キー数（ミスで 0 にリセット）。  
4. **Max Sentence Combo:** 連続正解単語数（ミスで 0 にリセット）。  
5. **Mistake Log:** どの文字でミスが多いかの分析用データ。

## **🛠 8\. 表示同期 (Display Sync)**

* **Shortest Path Guidance:** パスが複数ある場合、常に最短のローマ字ガイドをリアルタイムに更新して返します。  
* **Visual Segments:** アプリ側で定義された segments と入力進捗を照合し、現在位置をインデックスで管理します。

**Japanese Type Engine (JPTE) is under MIT License.**