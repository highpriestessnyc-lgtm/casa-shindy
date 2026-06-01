import Stripe from 'stripe'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

export const PRODUCTS = {
  membership: {
    priceId: process.env.STRIPE_MEMBERSHIP_PRICE_ID!,
    amount: 500,
    name: 'Casa Shindy メンバーシップ',
    type: 'subscription' as const,
  },
  kondate: {
    priceId: 'price_kondate',
    amount: 980,
    name: '献立アプリ',
    type: 'one_time' as const,
  },
  bento: {
    priceId: 'price_bento',
    amount: 980,
    name: '弁当アプリ',
    type: 'one_time' as const,
  },
  bingoLadder: {
    priceId: 'price_bingo',
    amount: 9800,
    name: 'BINGO LADDER',
    type: 'one_time' as const,
  },
  stage3d: {
    priceId: 'price_stage3d',
    amount: 1650,
    name: 'STAGE3D',
    type: 'one_time' as const,
  },
  danceHistory: {
    priceId: 'price_dance_history',
    amount: 450,
    name: 'ダンスの歴史本',
    type: 'one_time' as const,
  },
  dancingQuest: {
    priceId: 'free',
    amount: 0,
    name: 'Dancing Quest',
    type: 'free' as const,
  },
}
