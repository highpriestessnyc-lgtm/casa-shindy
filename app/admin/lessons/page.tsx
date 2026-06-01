import Link from 'next/link'
import { createSupabaseServerClient } from '@/lib/supabase-server'

export default async function LessonsPage() {
  const supabase = await createSupabaseServerClient()
  const {
