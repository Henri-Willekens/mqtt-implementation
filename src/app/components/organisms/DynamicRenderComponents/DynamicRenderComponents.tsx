import DynamicRenderComponentsProps from './DynamicRenderComponents.types';

import { useContext } from 'react';

import Draggable from '../../atoms/Draggable/Draggable';

import componentMap from '../../index';
import { ComponentConfig } from '../../../configuration/types';
import OrthologalLine from "../../atoms/OrthogonalLine/OrthogonalLine";
import { ConfigEnabledContext } from 'src/app/contexts/ConfigEnabled';

const DynamicRenderComponents: React.FC<DynamicRenderComponentsProps> = ({ 
  components, 
  connections, 
  gridEnabled, 
  activePageId 
}) => {

  const { _configEnabled } = useContext(ConfigEnabledContext);

  return (
    <>
      {components.map((componentConfig: ComponentConfig, index: number) => {
        const { type, props } = componentConfig;
        const Component = componentMap[type];
        const componentProps = { ...props }

        return (
          <Draggable key={index} elementInsideId={props.id} id={props.id} gridEnabled={gridEnabled} activePageId={activePageId}>
            <Component key={props.id} type={type} activePageId={activePageId} configEnabled={_configEnabled} {...componentProps} />
          </Draggable>
        )
      })}
      {connections && connections.map((conn, index) => {
        const fromConn = components[components.findIndex((_o) => _o.props.id === conn.from)];
        const toConn = components[components.findIndex((_o) => _o.props.id === conn.to)];

        return(
          <OrthologalLine key={index} from={fromConn} to={toConn} fromConnectionPosition="bottom" toConnectionPosition="bottom" type={conn.type} content={conn.content} />
        );
      })}
    </>
  );
};

export default DynamicRenderComponents;