# テストアプリ「Practype」はこちらから
* https://slp-222-swimin.github.io/Japanese-Type-Engine-v1-stable/example-cdn/

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
```

### 📊 取得可能な情報 (Data API)

`engine.input(key)` の戻り値、またはイベントを通じて以下の詳細なデータを取得できます。

#### 1. `InputResult` オブジェクト
タイピングの進捗や状態をリアルタイムに反映したオブジェクトです。

| プロパティ | 型 | 説明 |
| :--- | :--- | :--- |
| `type` | `string` | `"correct"` (正解), `"mistake"` (ミス), `"complete"` (語句完了) |
| `currentBuffer` | `string` | 現在入力中のローマ字バッファ (例: `"ky"`) |
| `remainingRomaji` | `string` | 最短経路に基づいた残りのローマ字ガイド |
| `remainingKana` | `string` | まだ入力の終わっていないかな文字列 |
| `expectedKeys` | `string[]` | 次に入力可能なキーのリスト (分岐も考慮) |
| `isFinished` | `boolean` | 全文の入力が完了したか |
| `segmentIndex` | `number` | かな文字列のうち、どこまで消化したかの文字インデックス |

#### 2. `engine.stats` (統計データ)
エンジンのインスタンスが保持する累計統計データです。

| プロパティ | 説明 |
| :--- | :--- |
| `kpm` | 1分あたりの正解打鍵数 (Keys Per Minute) |
| `accuracy` | 正解率 (0.0 〜 1.0) |
| `correctCount` | 合計正解打鍵数 |
| `mistakeCount` | 合計ミス打鍵数 |
| `currentCombo` | 現在の連続正解数 |
| `maxCombo` | 最大コンボ記録 |

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
