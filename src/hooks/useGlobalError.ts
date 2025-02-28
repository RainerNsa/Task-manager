import { useEffect } from 'react'
import toast from 'react-hot-toast'

export const useGlobalError = () => {
  useEffect(() => {
    const handleError = (event: ErrorEvent) => {
      toast.error(`Unexpected error: ${event.message}`)
    }

    const handleRejection = (event: PromiseRejectionEvent) => {
      toast.error(`Promise rejected: ${event.reason}`)
    }

    window.addEventListener('error', handleError)
    window.addEventListener('unhandledrejection', handleRejection)

    return () => {
      window.removeEventListener('error', handleError)
      window.removeEventListener('unhandledrejection', handleRejection)
    }
  }, [])
}