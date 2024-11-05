import { ChangeEvent } from 'react';

export default interface PredictiveSearchFieldProps {
  label: string,
  id: string,
  value: string,
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
}