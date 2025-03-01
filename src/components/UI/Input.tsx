import { InputHTMLAttributes, TextareaHTMLAttributes } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  type?: 'text' | 'date' | 'textarea'
}

export const Input = ({ label, type = 'text', ...props }: InputProps) => {
  const inputStyles = 'w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'

  return (
    <div className="space-y-2">
      {label && <label className="block text-sm font-medium">{label}</label>}
      {type === 'textarea' ? (
        <textarea
          {...(props as TextareaHTMLAttributes<HTMLTextAreaElement>)}
          className={`${inputStyles} min-h-[100px]`}
        />
      ) : (
        <input
          {...props}
          type={type}
          className={inputStyles}
        />
      )}
    </div>
  )
}