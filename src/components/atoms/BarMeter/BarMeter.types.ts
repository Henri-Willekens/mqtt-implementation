export default interface BarMeterProps {
  maxValue: number,
  unit: string,
  id: string,
  label: string,
  alertLines: [{ alertType: string, value: number, higherOrLowerThan: string }],
  numberOfTickLines: number,
}