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
  alarmSource: string,
}