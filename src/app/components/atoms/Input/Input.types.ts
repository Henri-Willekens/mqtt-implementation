import { ChangeEvent } from 'react';

export default interface InputProps {
  label: string,
  type: string,
  value: any,
  id: string,
  name: string,
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
};