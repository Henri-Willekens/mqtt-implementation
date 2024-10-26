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
      {components.map((componentConfig: ComponentConfig, index: number) => {
        // Destructure our component into it's type and props, to determine what to create and send through
        const { type, props } = componentConfig; 
        const Component = componentMap[type];
        const componentProps = { ... props }

        return(
          <Draggable 
            key={index} 
            id={props.id} 
            elementInsideId={props.id}
            gridEnabled={gridEnabled} >
            <Component
              key={props.id}
              type={type}
              { ...componentProps }
            />
          </Draggable>
        )
      })}
      {connections && connections.map((connection: ConnectionConfig, index: number) => {
        // Check what elements the connections needs to be mapped through and what information to send through
        const fromConnection = components[components.findIndex((o) => o.props.id === connection.from)];
        const toConnection = components[components.findIndex((o) => o.props.id === connection.to)];

        return(
          <OrthologalLine
            key={index}
            from={fromConnection}
            to={toConnection}
            type={connection.type}
            content={connection.content}
          />
        )
      })}
    </>
  );
};

export default DynamicRenderComponents;