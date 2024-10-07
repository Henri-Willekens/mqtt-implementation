export default interface ValueFieldProps {
  label: string,
  id: string,
  unit: string,
  requiresValueTimes: boolean,
  valueTimes?: number,
  isEditable: boolean,
  canSnap: boolean,
  configEnabled: boolean,
  activePageId: string
};