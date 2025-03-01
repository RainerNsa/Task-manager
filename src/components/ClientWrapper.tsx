'use client'

import { useGlobalError } from '@/hooks/useGlobalError'

export default function ClientWrapper({ children }: { children: React.ReactNode }) {
  useGlobalError() // Use the hook here
  return <>{children}</>
}