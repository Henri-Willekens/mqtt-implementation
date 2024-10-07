import { ChangeEvent } from 'react';

export default interface ToggleFieldProps {
  label: string,
  id: string,
  isChecked: boolean,
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
};