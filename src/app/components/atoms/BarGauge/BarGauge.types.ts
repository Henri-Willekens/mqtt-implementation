export default interface BarGaugeProps {
  id: string,
  maxValue: number,
  label: string,
  alertLines: [{ alertType: string, value: number }],
  numberOfTickLines: number,
  content?: string,
  configEnabled: boolean,
  activePageId: string,
  canSnap: boolean
}