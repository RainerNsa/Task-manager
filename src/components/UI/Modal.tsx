'use client'

import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { XMarkIcon } from '@heroicons/react/24/outline'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
  title?: string
  size?: 'sm' | 'md' | 'lg'
  preventClose?: boolean
  initialFocus?: boolean
}

const Modal = ({ 
  isOpen, 
  onClose, 
  children, 
  title, 
  size = 'md',
  preventClose = false,
  initialFocus = true
}: ModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null)
  const portalRoot = useRef<HTMLElement | null>(null)
  const lastActiveElement = useRef<Element | null>(null)
  const [isMounted, setIsMounted] = useState(false)

  // Create portal root and handle animations
  useEffect(() => {
    if (typeof document !== 'undefined') {
      portalRoot.current = document.getElementById('modal-root') || createPortalRoot()
    }
    return () => {
      if (portalRoot.current?.childElementCount === 0) {
        portalRoot.current?.remove()
      }
    }
  }, [])

  // Handle open/close transitions
  useEffect(() => {
    if (isOpen) {
      setIsMounted(true)
      lastActiveElement.current = document.activeElement
    } else {
      const timer = setTimeout(() => setIsMounted(false), 300)
      return () => clearTimeout(timer)
    }
  }, [isOpen])

  // Accessibility and focus management
  useEffect(() => {
    const handleFocus = (e: FocusEvent) => {
      if (!modalRef.current?.contains(e.target as Node)) {
        focusFirstElement()
      }
    }

    if (isOpen) {
      document.addEventListener('focus', handleFocus, true)
      document.body.style.overflow = 'hidden'
      if (initialFocus) focusFirstElement()
    }

    return () => {
      document.removeEventListener('focus', handleFocus, true)
      document.body.style.overflow = 'auto'
      if (lastActiveElement.current) {
        (lastActiveElement.current as HTMLElement)?.focus()
      }
    }
  }, [isOpen, initialFocus])

  // Keyboard handlers
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && !preventClose) onClose()
      if (e.key === 'Tab') handleTab(e)
    }

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown)
    }
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, preventClose, onClose])

  const focusFirstElement = () => {
    const focusable = getFocusableElements()
    focusable[0]?.focus()
  }

  const getFocusableElements = () => {
    return modalRef.current?.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    ) || []
  }

  const handleTab = (e: KeyboardEvent) => {
    const focusable = getFocusableElements()
    if (focusable.length === 0) return

    const first = focusable[0] as HTMLElement
    const last = focusable[focusable.length - 1] as HTMLElement

    if (e.shiftKey && document.activeElement === first) {
      last.focus()
      e.preventDefault()
    } else if (!e.shiftKey && document.activeElement === last) {
      first.focus()
      e.preventDefault()
    }
  }

  const sizeClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg'
  }

  if (!isOpen || !portalRoot.current) return null

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      className={`fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4
        ${isMounted ? 'animate-fade-in' : 'animate-fade-out'}`}
      onClick={(e) => !preventClose && e.target === e.currentTarget && onClose()}
    >
      <div
        ref={modalRef}
        className={`bg-white rounded-lg shadow-xl w-full ${sizeClasses[size]} 
          transform transition-all duration-300 ${isMounted ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}
          max-h-[90vh] overflow-y-auto`}
      >
        {(title || !preventClose) && (
          <div className="flex justify-between items-center p-4 border-b">
            {title && (
              <h2 className="text-xl font-semibold" id="modal-title">
                {title}
              </h2>
            )}
            {!preventClose && (
              <button
                onClick={onClose}
                className="p-1 hover:bg-gray-100 rounded-full ml-auto"
                aria-label="Close modal"
              >
                <XMarkIcon className="w-6 h-6 text-gray-600" />
              </button>
            )}
          </div>
        )}
        <div className="p-4">
          {children}
        </div>
      </div>
    </div>,
    portalRoot.current
  )
}

const createPortalRoot = () => {
  const div = document.createElement('div')
  div.id = 'modal-root'
  document.body.appendChild(div)
  return div
}


export default Modal