import { redirect } from 'next/navigation'
import { getAccess } from '@/lib/access'
import AdminShell from './AdminShell'

// 管理画面は管理者だけ。今までは誰でも /admin を開けたので、サーバー側で必ず弾く
export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user, isAdmin } = await getAccess()
  if (!user) redirect('/auth/login?redirect=/admin')
  if (!isAdmin) redirect('/members')
  return <AdminShell>{children}</AdminShell>
}
