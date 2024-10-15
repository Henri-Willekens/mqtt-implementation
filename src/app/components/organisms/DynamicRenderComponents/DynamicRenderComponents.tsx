import DynamicRenderComponentsProps from './DynamicRenderComponents.types';

import Draggable from '../../atoms/Draggable/Draggable';
import OrthologalLine from "../../atoms/OrthogonalLine/OrthogonalLine";

import { ComponentConfig, ConnectionConfig } from '../../../configuration/types';
import componentMap from '../../index';

const DynamicRenderComponents: React.FC<DynamicRenderComponentsProps> = ({ 
  components,
  connections,
  gridEnabled
}) => {
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
            id={props.id} 
            elementInsideId={props.id}
            gridEnabled={gridEnabled} >
            <Component
              key={props.id}
              type={type}
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