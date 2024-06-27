export default interface BarMeterProps {
  xPos: string,
  yPos: string,
  maxValue: number,
  unit: string,
  title: string,
  label: string,
  alertLines: [{ alertType: string, value: number, higherOrLowerThan: string }],
  amountOfTickLines: number,
}