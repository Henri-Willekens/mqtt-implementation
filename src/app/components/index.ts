import Compass from "./atoms/Compass/Compass";
import BarGauge from "./atoms/BarGauge/BarGauge";
import Rudder from "./atoms/Rudder/Rudder";
import HeatCoolingPump from "./atoms/HeatCoolingPump/HeatCoolingPump";
import Valve from "./atoms/Valve/Valve";

const componentMap: { [key: string]: React.FC<any> } = {
  Compass,
  BarGauge,
  Rudder,
  HeatCoolingPump,
  Valve
};

export default componentMap;