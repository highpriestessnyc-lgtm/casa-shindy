import { createSupabaseServerClient } from '@/lib/supabase-server'

// アクセスの3段階
//   ゲスト        : 誰でも。トップ・会員エリアのメニュー・レッスン一覧まで
//   無料登録      : ログインしていればOK。コラム・カルチャー・MA@PAINTER・無料アプリ
//   会員(¥500/月) : profiles.is_member が true。ダンスレッスン動画・BINGO ANALYZER PRO など
export const ADMIN_EMAIL = 'high.priestess.nyc@gmail.com'

export type Access = {
  user: { id: string; email?: string } | null
  isAdmin: boolean
  isMember: boolean
}

export async function getAccess(): Promise<Access> {
  const supabase = await createSupabaseServerClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { user: null, isAdmin: false, isMember: false }

  const isAdmin = user.email === ADMIN_EMAIL
  if (isAdmin) return { user, isAdmin, isMember: true }

  const { data: profile } = await supabase.from('profiles').select('is_member').eq('id', user.id).single()
  return { user, isAdmin, isMember: !!profile?.is_member }
}
