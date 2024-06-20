import Compass from "./atoms/Compass/Compass";
import BarMeter from "./atoms/BarMeter/BarMeter";
import Rudder from "./atoms/Rudder/Rudder";

const componentMap: { [key: string]: React.FC<any> } = {
  Compass,
  BarMeter,
  Rudder
};

export default componentMap;