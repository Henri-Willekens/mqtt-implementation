import { ChangeEvent } from 'react';

export default interface InputFieldProps {
  label: string,
  type: 'text' | 'number',
  id: string,
  value: string | number | boolean, // TODO: temporary added boolean to it, should be removed
  onChange: (e: ChangeEvent<HTMLInputElement>) => void,
  placeholder?: string
}