import { stripe } from '@/lib/stripe'
import { createSupabaseServerClient } from '@/lib/supabase-server'
import { NextResponse } from 'next/server'

export async function POST() {
  const supabase = await createSupabaseServerClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { data: profile } = await supabase
    .from('profiles')
    .select('stripe_subscription_id')
    .eq('id', user.id)
    .single()

  if (!profile?.stripe_subscription_id) {
    return NextResponse.json({ error: 'No subscription found' }, { status: 400 })
  }

  await stripe.subscriptions.cancel(profile.stripe_subscription_id)

  await supabase
    .from('profiles')
    .update({ is_member: false, stripe_subscription_id: null })
    .eq('id', user.id)

  return NextResponse.json({ success: true })
}