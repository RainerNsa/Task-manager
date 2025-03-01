'use client';

import { ChangeEvent } from 'react';

interface InputProps {
  label: string;
  type?: 'text' | 'email' | 'password' | 'textarea' | 'date'; // Add 'email' and 'password'
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  placeholder?: string;
  required?: boolean;
  id?: string;
}

export const Input = ({ label, type = 'text', value, onChange, placeholder, required, id, }: InputProps) => {
  if (type === 'textarea') {
    return (
      <div className="space-y-1">
        <label className="block text-sm font-medium">{label}</label>
        <textarea
          id={id}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          className="w-full p-2 border rounded"
        />
      </div>
    );
  }

  return (
    <div className="space-y-1">
      <label className="block text-sm font-medium">{label}</label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className="w-full p-2 border rounded"
      />
    </div>
  );
};