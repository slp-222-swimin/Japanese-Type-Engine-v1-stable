# 📦 JPTE (Japanese Type Engine)

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![GitHub](https://img.shields.io/badge/GitHub-Repository-blue?logo=github)](https://github.com/slp-222-swimin/Japanese-Type-Engine-v1-stable)

**JPTE (ジェプト)** は、モダンなWebアプリケーションのための高密度な日本語タイピング・ロジックコアです。ブラウザ標準のフォーム挙動を完全に排除し、JavaScriptによる低レイテンシなキー入力解析を実現。グラフ理論に基づく柔軟な経路探索により、あらゆるローマ字入力パターンを網羅します。

---

## 🚀 主な機能 (Core Features)

- **📈 有向グラフによる経路探索**: 一文における「すべての正解パス」を網羅。
- **⌨️ 高度な促音・撥音処理**: 「っ」の子音自動重複や、文脈に応じた「ん」の自動解決。
- **📊 プロフェッショナル統計**: KPM (Keys Per Minute)、正確性、最大コンボなどの統計を計算。
- **💡 リアルタイムガイド**: 常に「最短のローマ字ガイド」を算出して提供。

---

## 🛠 セットアップ (Installation)

### 1. 🌐 CDN経由 (ブラウザで即座に開始)
ビルドツールを使わず、HTMLの `<script type="module">` で直接インポートできます。

```javascript
/* GitHubリポジトリからjsDelivr経由で読み込む */
import { JPTEEngine } from 'https://cdn.jsdelivr.net/gh/slp-222-swimin/Japanese-Type-Engine-v1-stable/src/index.js';
```

### 2. 📦 npm / GitHub
開発環境にパッケージとして導入する場合：

```bash
# GitHubリポジトリを直接インストール
npm install github:slp-222-swimin/Japanese-Type-Engine-v1-stable

# またはクローンして利用
git clone https://github.com/slp-222-swimin/Japanese-Type-Engine-v1-stable.git
```

---

## 📖 使い方 (Manual)

### インスタンスの生成 (Initialization)

```javascript
import { JPTEEngine } from './src/index.js';

const engine = new JPTEEngine({  
  options: {  
    strictNn: true,           // 文末の「ん」を "nn" 固定にするか (厳格モード)
    allowBackspace: true,     // バックスペースによる戻りを許可
    ignoreSpace: true         // スペースキーを判定から除外
  }  
});
```

### ワードの設定と入力 (Input Flow)

```javascript
// 1. 判定対象を設定
engine.newWord("きのうとうきょうへいった");

// 2. キー入力を処理 (1文字ずつ)
const result = engine.input("k");

/* 
  result = { 
    type: 'correct', 
    currentBuffer: 'k', 
    remainingRomaji: 'inou...', 
    expectedKeys: ['i'] 
  } 
*/
```

---

## 🎮 デモ (Interactive Demo)

本リポジトリには、最新のガラスモーフィズム・デザインを採用したデモ UI が含まれています。

1. ローカルサーバーを起動 (`npx serve .` など)
2. `http://localhost:3000/example/` をブラウザで開く

---

## ⚖️ ライセンス (License)

Copyright (c) 2026 slp-222-swimin.
JPTE is under the **MIT License**.

---

### 🏛 クレジット
本プロジェクトの開発には、以下の先進的なAI技術が活用されています。
[ChatGPT](https://chatgpt.com) / [Gemini](https://gemini.google.com) / [Google Antigravity](https://antigravity.google/)
