export default interface CompassProps {
  id: string,
  source: string,
  waveArrowOutside: boolean,
  stepsOfDegrees: number,
  configEnabled: boolean,
  width: number,
  height: number
  activePageId: string,
  canSnap: boolean
}