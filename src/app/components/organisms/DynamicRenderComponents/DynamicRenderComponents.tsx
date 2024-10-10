import DynamicRenderComponentsProps from './DynamicRenderComponents.types';

import { useContext } from 'react';

import Draggable from '../../atoms/Draggable/Draggable';
import OrthologalLine from "../../atoms/OrthogonalLine/OrthogonalLine";

import { ConfigEnabledContext } from 'src/app/contexts/ConfigEnabled';
import { ActivePageIdContext } from 'src/app/contexts/ActivePageId';
import { ComponentConfig, ConnectionConfig } from '../../../configuration/types';
import componentMap from '../../index';

const DynamicRenderComponents: React.FC<DynamicRenderComponentsProps> = ({ 
  components,
  connections,
  gridEnabled
}) => {
  const { _configEnabled } = useContext(ConfigEnabledContext);
  const { _activePageId } = useContext(ActivePageIdContext);

  return(
    <>
      {components.map((_componentConfig: ComponentConfig, _index: number) => {
        // Destructure our component into it's type and props, to determine what to create and send through
        const { type, props } = _componentConfig; 
        const Component = componentMap[type];
        const _componentProps = { ... props }

        return(
          <Draggable 
            key={_index} 
            elementInsideId={props.id} 
            id={props.id} 
            gridEnabled={gridEnabled} 
            activePageId={_activePageId}
          >
            <Component
              key={props.id}
              type={type}
              activePageId={_activePageId}
              configEnabled={_configEnabled}
              { ..._componentProps }
            />
          </Draggable>
        )
      })}
      {connections && connections.map((_connection: ConnectionConfig, _index: number) => {
        // Check what elements the connections needs to be mapped through and what information to send through
        const _fromConnection = components[components.findIndex((_o) => _o.props.id === _connection.from)];
        const _toConnection = components[components.findIndex((_o) => _o.props.id === _connection.to)];

        return(
          <OrthologalLine
            key={_index}
            from={_fromConnection}
            to={_toConnection}
            type={_connection.type}
            content={_connection.content}
          />
        )
      })}
    </>
  );
};

export default DynamicRenderComponents;