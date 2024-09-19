export default interface ValueFieldProps {
  label: string,
  id: string,
  unit: string,
  requiresValueTimes: boolean,
  valueTimes?: number
  isEditable: boolean
};