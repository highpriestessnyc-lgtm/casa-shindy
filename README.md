# Casa Shindy — Official Fan Page

## 技術スタック
- **Next.js 14** (App Router)
- **Supabase** (Auth + PostgreSQL)
- **Stripe** (月額サブスク + 単品購入)
- **Vercel** (ホスティング)
- **Tailwind CSS**

## セットアップ手順

### 1. Supabase設定
1. https://supabase.com でプロジェクト作成
2. `supabase/schema.sql` をSQL Editorで実行
3. Authentication > Settings > Site URL を設定

### 2. Stripe設定
1. https://stripe.com でアカウント作成
2. 商品を作成:
   - **月額メンバーシップ**: ¥500/月 の繰り返し料金
   - **献立アプリ**: ¥980 一回払い
   - **弁当アプリ**: ¥980 一回払い
   - **BINGO LADDER**: ¥9,800 一回払い
   - **STAGE3D**: ¥1,650 一回払い
   - **ダンスの歴史本**: ¥450 一回払い
3. 各商品のPrice IDをコピー

### 3. 環境変数設定 (.env.local)
```
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
STRIPE_MEMBERSHIP_PRICE_ID=price_xxx
NEXT_PUBLIC_APP_URL=https://casa-shindy.vercel.app
```

### 4. Stripe Webhook設定
```
stripe listen --forward-to localhost:3000/api/stripe/webhook
```
本番: StripeダッシュボードでWebhook URLを設定
イベント: `checkout.session.completed`, `customer.subscription.deleted`, `invoice.payment_failed`

### 5. 開発起動
```bash
npm run dev
```

### 6. Vercelデプロイ
```bash
npx vercel --prod
```

## ページ構成
| URL | 説明 | アクセス |
|-----|------|---------|
| / | LP | 全員 |
| /shop | アプリ購入 | 全員 |
| /join | メンバー登録 | 全員 |
| /auth/login | ログイン | 全員 |
| /auth/signup | 新規登録 | 全員 |
| /members | 会員ダッシュボード | 会員のみ |
| /members/lesson | Monthly Dance Lesson | 会員のみ |
| /members/soliloquy | シンディの独り言 | 会員のみ |
| /members/market | 相場配信 | 会員のみ |
| /members/culture/* | 映画・漫画・4スタンス | 会員のみ |
| /members/painter | MA@PAINTER | 会員のみ |
| /shop/dancing-quest/download | Dancing Quest DL | 全員（無料） |
