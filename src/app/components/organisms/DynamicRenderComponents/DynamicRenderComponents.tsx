import DynamicRenderComponentsProps from './DynamicRenderComponents.types';

import { useContext } from 'react';

import Draggable from '../../atoms/Draggable/Draggable';

import componentMap from '../../index';
import { ComponentConfig } from '../../../configuration/types';
import { ConfigEnabledContext } from 'src/app/contexts/ConfigEnabled';

const DynamicRenderComponents: React.FC<DynamicRenderComponentsProps> = ({ config, gridEnabled, activePageId }) => {

  const { _configEnabled } = useContext(ConfigEnabledContext);

  return (
    <>
      {config.map((componentConfig: ComponentConfig, index: number) => {
        const { type, props } = componentConfig;
        const Component = componentMap[type];
        const componentProps = { ...props }

        return (
          <Draggable elementInsideId={props.id} key={props.id} id={props.id} gridEnabled={gridEnabled} activePageId={activePageId}>
            <Component key={index} activePageId={activePageId} configEnabled={_configEnabled} {...componentProps} />
          </Draggable>
        )
      })}
    </>
  );
};

export default DynamicRenderComponents;