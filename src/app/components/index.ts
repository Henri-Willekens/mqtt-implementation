import Compass from './atoms/Compass/Compass';
import BarGauge from './atoms/BarGauge/BarGauge';
import Rudder from './atoms/Rudder/Rudder';
import Pump from './atoms/Pump/Pump';
import Valve from './atoms/Valve/Valve';
import ValueField from './atoms/ValueField/ValueField';
import ReferenceButton from './atoms/ReferenceButton/ReferenceButton';
import ConfigurableToggleButton from './atoms/ConfigurableToggleButton/ConfigurableToggleButton';
import FlatCompass from './atoms/FlatCompass/FlatCompass';

const componentMap: { [key: string]: React.FC<any> } = {
  Compass,
  BarGauge,
  Rudder,
  Pump,
  Valve,
  ValueField,
  ReferenceButton,
  ConfigurableToggleButton,
  FlatCompass
};

export default componentMap;