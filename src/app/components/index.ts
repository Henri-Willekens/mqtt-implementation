import Compass from "./atoms/Compass/Compass";
import BarMeter from "./atoms/BarMeter/BarMeter";
import Rudder from "./atoms/Rudder/Rudder";
import HeatCoolingPump from "./atoms/HeatCoolingPump/HeatCoolingPump";

const componentMap: { [key: string]: React.FC<any> } = {
  Compass,
  BarMeter,
  Rudder,
  HeatCoolingPump
};

export default componentMap;