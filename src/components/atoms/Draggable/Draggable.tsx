import React, { useContext, useState } from 'react';
import { _gridPositions } from '../Grid/Grid';
import DraggProps from './Draggable.types';
import './Draggable.scss';
import { ConfigContext } from '../../../contexts/Config';

const Draggable: React.FC<DraggProps> = ({ id, children, gridEnabled }) => {
  const [position, setPosition] = useState({ x: 50, y: 50 });
  const [dragging, setDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const { _configEnabled, setConfigEnabled } = useContext(ConfigContext);

  const startDrag = (event: any) => {
    if (_configEnabled) {
      const rect = event.target.getBoundingClientRect();
      setOffset({ x: event.clientX - rect.left, y: event.clientY - rect.top });
      setDragging(true);
    }
  };

  const onDrag = (event: any) => {
    if (dragging) {
      setPosition({ x: event.clientX - offset.x, y: event.clientY - offset.y });
    }
  };

  const stopDrag = () => {
    setDragging(false);
    if (gridEnabled) {
      snapToGrid();
    }
  };

  const snapToGrid = () => {
    let closestPosition = _gridPositions[0];
    let minDistance = Number.MAX_VALUE;

    _gridPositions.forEach((_gridPosition) => {
      const distance = Math.hypot(position.x - _gridPosition.x, position.y - _gridPosition.y);
      if (distance < minDistance) {
        closestPosition = _gridPosition;
        minDistance = distance;
      }
    });

    setPosition({ x: closestPosition.x, y: closestPosition.y });
  };

  return (
    <div
      className={_configEnabled ? "draggable" : "non-draggable"}
      onMouseDown={startDrag}
      onMouseMove={onDrag}
      onMouseUp={stopDrag}
      key={id}
      style={{ left: position.x, top: position.y }}
    >
      {children}
    </div>
  );
};

export default Draggable;
