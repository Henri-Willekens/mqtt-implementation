export default interface BarMeterProps {
  key: string,
  maxValue: number,
  unit: string,
  id: string,
  label: string,
  alertLines: [{ alertType: string, value: number, higherOrLowerThan: string }],
  numberOfTickLines: number,
  configEnabled: boolean,
  activePageId: string
}