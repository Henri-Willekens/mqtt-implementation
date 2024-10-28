export default interface CompassProps {
  id: string,
  source: string,
  waveArrowOutside: boolean,
  stepsOfDegrees: number,
  width: number,
  height: number,
  dataSource: string,
  mqttTopic: string,
  mqttCogTopic: string,
  mqttWaveTopic: string, 
  mqttWindTopic: string
}