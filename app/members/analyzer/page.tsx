import { getAccess } from '@/lib/access'
import { PaywallGate } from '@/app/components/AccessGate'
import AnalyzerClient from './AnalyzerClient'

// BINGO ANALYZER PRO は月額¥500の会員限定。AI解析のAPI(/api/analyze)側でも同じ判定をしている。
export default async function AnalyzerPage() {
  const { user, isMember } = await getAccess()
  if (!isMember) return <PaywallGate isLoggedIn={!!user} what="BINGO ANALYZER PRO" perks="チャート分析AIが使い放題、ダンスレッスン動画もすべて見られます" />
  return <AnalyzerClient />
}
