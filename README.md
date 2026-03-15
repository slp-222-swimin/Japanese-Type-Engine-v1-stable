# 📦 JPTE (Japanese Type Engine)

JPTE (ジェプト) は、ブラウザ標準のフォーム挙動を完全に排し、JavaScriptで生のキー入力を解析・照合することで、究極のタイピング体験を提供するロジックコア・ライブラリです。

## 🚀 特徴

- **有向グラフによる経路探索**: 一文における「すべての正解パス」を網羅した動的グラフを構築し、柔軟なローマ字入力をサポートします。
- **高度な促音・撥音処理**: 「っ」の子音自動重複や、文脈に応じた「ん」の自動解決（単発 'n' の許容など）を完璧に処理します。
- **競技タイピング指標**: KPM (Keys Per Minute)、正確性、最大コンボ数などの統計をリアルタイムで算出します。
- **表示同期システム**: 常に最短のローマ字ガイドをリアルタイムに提供し、ユーザーをガイドします。

## 🛠 セットアップ

### 🌐 CDN経由で直接インポート (ブラウザ)

ビルドプロセスなしで、HTMLの `<script type="module">` から直接読み込むことができます。

```javascript
import { JPTEEngine } from 'https://cdn.jsdelivr.net/gh/ユーザー名/JPTE/src/index.js';
```

### インストール (npm/GitHub)

ビルドツールを使用している場合は、リポジトリをパッケージとして追加できます。

```bash
# npm経由で直接インストール
npm install github:ユーザー名/JPTE

# またはリポジトリをクローン
git clone https://github.com/ユーザー名/JPTE.git
```

### クラスの初期化

モジュールをインポートして初期化します。

ライブラリをプロジェクト内に配置し、ES Modulesとしてインポートします。

```javascript
import { JPTEEngine } from './src/index.js';

const engine = new JPTEEngine({  
  options: {  
    strictNn: true,           // 文末の「ん」に「nn」を強制するか  
    allowBackspace: true,     // バッファの巻き戻しを許可するか  
    ignoreSpace: true         // スペース入力を無視するか  
  }  
});
```

## ⚙️ コアメソッド

### `newWord(kana)`
判定用グラフを構築します。

```javascript
engine.newWord("きのうとうきょうへいった");
```

### `input(key)`
ユーザーのキー入力をエンジンに渡し、判定結果を取得します。

```javascript
const result = engine.input("k");
// result: { type: 'correct', currentBuffer: 'k', remainingRomaji: 'inou...', ... }
```

### イベントシステム

```javascript
engine.on('correct', (data) => console.log('正解！'));
engine.on('mistake', (data) => console.log('ミス:', data.expectedKeys));
engine.on('complete', (stats) => console.log('完了！', stats));
```

## 🎮 デモ

本リポジトリには、JPTEの実力を体験できるデモが同梱されています。

1. ローカルサーバーを起動
   ```bash
   npx serve .
   ```
2. ブラウザで `http://localhost:3000/example/` を開く

## ⚖️ ライセンス

JPTE (Japanese Type Engine) is under **MIT License**.
本プロジェクトは、[ChatGPT](https://chatgpt.com)、[Gemini](https://gemini.google.com)、[Google Antigravity](https://antigravity.google/)を使用して作成されました。
