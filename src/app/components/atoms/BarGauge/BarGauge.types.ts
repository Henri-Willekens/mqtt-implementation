interface AlertLine {
  alertType: string, 
  value: number
}

export default interface BarGaugeProps {
  id: string,
  maxValue: number,
  startValue: number,
  minValue: number;
  label: string,
  alertLines: AlertLine[],
  numberOfTickLines: number,
  width: number,
  height: number,
  alarmSource: string,
  dataSource: string,
  mqttTopic: string
}