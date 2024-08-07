import Compass from "./atoms/Compass/Compass";
import BarMeter from "./atoms/BarMeter/BarMeter";
import Rudder from "./atoms/Rudder/Rudder";
import HeatCoolingPump from "./atoms/HeatCoolingPump/HeatCoolingPump";
import Valve from "./atoms/Valve/Valve";

const componentMap: { [key: string]: React.FC<any> } = {
  Compass,
  BarMeter,
  Rudder,
  HeatCoolingPump,
  Valve
};

export default componentMap;