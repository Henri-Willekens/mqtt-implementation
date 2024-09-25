export default interface BarMeterProps {
  maxValue: number,
  unit: string,
  id: string,
  label: string,
  alertLines: [{ alertType: string, value: number }],
  numberOfTickLines: number,
  content?: string,
  configEnabled: boolean,
  activePageId: string,
  canSnap: boolean
}