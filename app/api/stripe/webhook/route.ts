import { stripe } from '@/lib/stripe'
import { getSupabaseAdmin } from '@/lib/supabase'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  const body = await request.text()
  const sig = request.headers.get('stripe-signature')!

  let event
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!)
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 400 })
  }

  const admin = getSupabaseAdmin()

  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object as any
      const userId = session.metadata?.userId
      const type = session.metadata?.type

      if (type === 'membership' && userId) {
        await admin.from('profiles').upsert({
          id: userId,
          is_member: true,
          stripe_customer_id: session.customer,
          stripe_subscription_id: session.subscription,
          membership_start: new Date().toISOString(),
        })
      } else if (userId && session.metadata?.productKey) {
        await admin.from('purchases').insert({
          user_id: userId,
          product_key: session.metadata.productKey,
          stripe_session_id: session.id,
          purchased_at: new Date().toISOString(),
        })
      }
      break
    }
    case 'customer.subscription.deleted': {
      const sub = event.data.object as any
      await admin.from('profiles')
        .update({ is_member: false, stripe_subscription_id: null })
        .eq('stripe_subscription_id', sub.id)
      break
    }
    case 'invoice.payment_failed': {
      const invoice = event.data.object as any
      await admin.from('profiles')
        .update({ is_member: false })
        .eq('stripe_customer_id', invoice.customer)
      break
    }
  }

  return NextResponse.json({ received: true })
}
