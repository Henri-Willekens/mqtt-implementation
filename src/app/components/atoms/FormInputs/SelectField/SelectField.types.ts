import { ChangeEvent } from 'react';

export default interface SelectFieldProps {
  label: string,
  id: string,
  value: string,
  options: string[],
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void
};