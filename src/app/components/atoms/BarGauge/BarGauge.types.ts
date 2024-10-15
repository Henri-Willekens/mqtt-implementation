interface AlertLine {
  alertType: string, 
  value: number
}

export default interface BarGaugeProps {
  id: string,
  maxValue: number,
  label: string,
  alertLines: AlertLine[],
  numberOfTickLines: number,
  width: number,
  height: number,
  alarmSource: string,
}