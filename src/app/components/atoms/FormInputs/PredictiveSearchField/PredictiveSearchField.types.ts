import { ChangeEvent } from 'react';

export default interface PredictiveSearchFieldProps {
  id: string,
  value: string,
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
}