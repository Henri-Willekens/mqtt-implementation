import { ChangeEvent } from 'react';

export default interface PredictiveSearchFieldProps {
  label?: string,
  id: string,
  value: string,
  onChange: (eOrString: React.ChangeEvent<HTMLInputElement | HTMLSelectElement> | string) => void
}