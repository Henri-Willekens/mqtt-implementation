export default interface BarMeterProps {
  maxValue: number,
  unit: string,
  title: string,
  label: string,
  alertLines: [{ alertType: string, value: number }]
}