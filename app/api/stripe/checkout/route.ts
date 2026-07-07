import { stripe } from '@/lib/stripe'
import { createSupabaseServerClient } from '@/lib/supabase-server'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  const { priceId, type, productKey } = await request.json()
  const supabase = await createSupabaseServerClient()
  const { data: { user } } = await supabase.auth.getUser()

  const baseUrl = process.env.NEXT_PUBLIC_APP_URL

  try {
    if (type === 'subscription') {
      // 月額サブスク
      const session = await stripe.checkout.sessions.create({
        mode: 'subscription',
        payment_method_types: ['card', 'paypay'],
        line_items: [{ price: priceId, quantity: 1 }],
        success_url: `${baseUrl}/members?success=1`,
        cancel_url: `${baseUrl}/join`,
        customer_email: user?.email,
        metadata: { userId: user?.id || '', type: 'membership' },
        locale: 'ja',
      })
      return NextResponse.json({ url: session.url })
    } else if (type === 'free') {
      // 無料DL
      return NextResponse.json({ url: `/shop/${productKey}/download` })
    } else {
      // 単品購入
      const session = await stripe.checkout.sessions.create({
        mode: 'payment',
        payment_method_types: ['card', 'paypay'],
        line_items: [{ price: priceId, quantity: 1 }],
        success_url: `${baseUrl}/shop/${productKey}/download?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${baseUrl}/shop/${productKey}`,
        customer_email: user?.email,
        metadata: { userId: user?.id || '', productKey },
        locale: 'ja',
      })
      return NextResponse.json({ url: session.url })
    }
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
