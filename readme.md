# 縦書きエディタ (Tategaki Editor)

日本語縦書きテキストに特化したWebベースエディタです。小説、同人誌、創作文書の作成に最適化されており、ルビや縦中横などの日本語組版機能を提供します。

## 🌟 特徴

- **縦書きレイアウト**: CSS `writing-mode` による本格的な縦書き表示
- **ルビ（ふりがな）**: クリックで編集可能なルビ機能
- **縦中横**: 数字や英字を縦書き内で横向きに表示
- **リアルタイム保存**: LocalStorageによる自動保存
- **文書管理**: 複数文書の作成・編集・削除・検索
- **データ形式**: JSON形式でのインポート・エクスポート
- **レスポンシブUI**: カード表示・テーブル表示の切り替え

## 🚀 技術スタック

- **Frontend**: React 18 + TypeScript
- **エディタ**: Lexical (Facebook製拡張可能テキストエディタ)
- **スタイリング**: Vanilla Extract (CSS-in-JS) + Tailwind CSS
- **ルーティング**: React Router DOM
- **ビルドツール**: Vite
- **テスト**: Vitest + React Testing Library
- **リンティング**: Biome

## 📦 インストール

```bash
# リポジトリをクローン
git clone https://github.com/rassi0429/tategaki-editor.git
cd tategaki-editor

# 依存関係をインストール
npm install

# 開発サーバーを起動
npm run dev
```

## 🛠️ 開発コマンド

```bash
# 開発サーバー起動
npm run dev

# プロダクションビルド
npm run build

# ビルドプレビュー
npm run preview

# テスト実行
npm run test

# リンティング
npm run lint

# 型チェック
npm run typecheck
```

## 📝 使用方法

### 基本的な文書操作

1. **新規作成**: 「新規作成」ボタンで新しい文書を作成
2. **編集**: 文書をクリックして編集画面に移動
3. **保存**: 変更は自動的にLocalStorageに保存
4. **削除**: カードまたはテーブルから削除ボタンで文書を削除

### エディタ機能

#### テキスト書式
- **見出し**: 見出し大（H1）、見出し小（H2）、本文大（H3）、本文小（H4）
- **装飾**: 太字、斜体、取り消し線、下線

#### 日本語特有機能
- **ルビ**: テキストを選択して「ルビ」ボタンでふりがなを追加
- **縦中横**: 数字や英字を選択して「縦中横」ボタンで横向き表示

### データ管理
- **エクスポート**: JSON形式で文書をローカルファイルに保存
- **インポート**: JSON形式の文書ファイルを読み込み

## 🏗️ アーキテクチャ

### コンポーネント構成

```
src/
├── components/
│   ├── DocumentList.tsx      # 文書一覧画面
│   ├── EditorPage.tsx        # エディタページラッパー
│   ├── TategakiEditor.tsx    # メインエディタコンポーネント
│   └── editorplugins/        # Lexicalプラグイン群
│       ├── ToolbarPlugin.tsx     # ツールバー
│       ├── RubyNode.tsx          # ルビ機能
│       ├── TateChuYokoNode.tsx   # 縦中横機能
│       ├── CurrentInfo.tsx       # 文字数・行数表示
│       └── PageBreakPlugin.tsx   # 改ページ表示
├── utils/
│   └── documentManager.ts    # 文書管理ユーティリティ
└── styles/
    └── index.css.ts         # グローバルスタイル
```

### Lexicalプラグインシステム

このエディタはLexicalの拡張可能なプラグインシステムを活用：

- **RubyNode**: HTMLの`<ruby>`タグを使用したルビ実装
- **TateChuYokoNode**: CSS `text-combine-upright`による縦中横実装
- **CustomOnChangePlugin**: 変更検知と自動保存
- **PageBreakPlugin**: 視覚的な改ページ位置表示

## 🎨 スタイリング

- **Vanilla Extract**: 型安全なCSS-in-JS
- **Tailwind CSS**: ユーティリティファーストCSS
- **カスタムプロパティ**: 縦書き用のwriting-mode、text-orientationサポート

## 📱 ブラウザサポート

- Chrome/Chromium 88+
- Firefox 89+  
- Safari 14+
- Edge 88+

縦書きCSS (`writing-mode: vertical-rl`) をサポートするモダンブラウザが必要です。

## 🤝 コントリビューション

1. フォークして新しいブランチを作成
2. 機能を実装・バグを修正
3. テストを追加・実行
4. プルリクエストを送信

## 📄 ライセンス

MIT License

このプロジェクトはMITライセンスの下で公開されています。詳細は[LICENSE](LICENSE)ファイルをご覧ください。

## 🔗 リンク

- [GitHub Repository](https://github.com/rassi0429/tategaki-editor)
- [参考実装](https://vertical-japanese-input-editor.vercel.app/)

## 📋 今後の予定

- [ ] PDF出力機能
- [ ] カスタムフォント設定
- [ ] テーマ機能（ダーク/ライトモード）
- [ ] クラウド同期機能
- [ ] コラボレーション機能
- [ ] 印刷レイアウトプレビュー

---

**縦書きエディタ**で、美しい日本語文書を作成しましょう！
EOF < /dev/null
