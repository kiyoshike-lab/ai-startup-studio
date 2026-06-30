# AI Startup Studio MVP

ChatGPTを共同創業者として、会社の立ち上げを12ステップで進めるローカル完結型のMVPです。

このアプリは「AIが勝手に会社を作る」ものではなく、ユーザーが社長として意思決定し、共同創業者の提案を見ながら会社の輪郭を作るためのスタジオです。

## 役割

- AI Startup Studio: 会社を立ち上げる
- AI Company OS: 会社を経営する

会社設立後は、AI Company OSへ渡しやすい構造で会社情報をローカル保存します。

## 機能

- ミニマルなトップページ
- 12ステップの起業スタジオ
- 共同創業者からの提案
- 社長の入力欄
- ステップ完了フロー
- Vaultへの途中保存と復元
- 会社設立後のローカル保存
- 外部APIなし、Supabaseなし

## ローカル保存

ブラウザの `localStorage` に保存します。

- `ai-startup-studio.current`: 現在の作業状態
- `ai-startup-studio.vault`: Vaultの保存データ
- `ai-startup-studio.company`: 設立後の会社情報

## 開発

```bash
npm run dev
```

## ビルド

```bash
npm run build
```

`dist/` に静的ファイルが生成されます。

## Lint

```bash
npm run lint
```

## Vercel公開手順

1. GitHubへこのプロジェクトをpushします。
2. Vercelで「Add New Project」を選びます。
3. GitHubリポジトリを選択します。
4. Build Commandに `npm run build` を指定します。
5. Output Directoryに `dist` を指定します。
6. Install Commandは空、または `npm install` のままで問題ありません。
7. Deployを押します。

外部APIを使っていないため、環境変数の設定は不要です。

## 将来の拡張

- OpenAI APIへの差し替え
- 市場調査API
- ロゴ生成
- LP自動生成
- SNS投稿生成
- AI Company OSへの自動引き継ぎ

