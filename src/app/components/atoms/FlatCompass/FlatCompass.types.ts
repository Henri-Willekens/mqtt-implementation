export default interface FlatCompassProps {
  id: string,
  label: string,
  width: number,
  height: number,
  dataSource: string,
  mqttTopic: string,
  visibleDegrees: number
}