export default interface BarMeterProps {
  xPos: string,
  yPos: string,
  maxValue: number,
  unit: string,
  id: string,
  label: string,
  alertLines: [{ alertType: string, value: number, higherOrLowerThan: string }],
  numberOfTickLines: number,
}