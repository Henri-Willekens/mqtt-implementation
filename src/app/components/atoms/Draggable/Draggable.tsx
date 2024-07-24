import { useState } from 'react';
import { _gridPositions } from '../Grid/Grid';

import DraggProps from './Draggable.types';
import './Draggable.scss';

const Draggable: React.FC<DraggProps> = ({ children, gridEnabled, configMode }) => {
  const [_position, setPosition] = useState({ x: 0, y: 0 });
  const [_dragging, setDragging] = useState(false);
  const [_offset, setOffset] = useState({ x: 0, y: 0 });


  const startDrag = (_event: any) => {
    if (configMode) {
      const _rect = _event.target.getBoundingClientRect();
      setOffset({ x: _event.clientX - _rect.left, y: _event.clientY - _rect.top });
      setDragging(true);
    }
  };


  const onDrag = (_event: any) => {
    if (_dragging) {
      setPosition({ x: _event.clientX - _offset.x, y: _event.clientY - _offset.y });
    }
  };


  const stopDrag = () => {
    setDragging(false);
    if (gridEnabled) {
      snapToGrid();
    }
  };


  const snapToGrid = () => {
    let _closestPosition = _gridPositions[0];
    let _minDistance = Number.MAX_VALUE;

    _gridPositions.forEach((_gridPosition) => {
      const distance = Math.hypot(_position.x - _gridPosition.x, _position.y - _gridPosition.y);
      if (distance < _minDistance) {
        _closestPosition = _gridPosition;
        _minDistance = distance;
      }
    });

    setPosition({ x: _closestPosition.x, y: _closestPosition.y });
  };


  return (
    <div
      className={configMode ? "draggable" : "non-draggable"}
      onMouseDown={startDrag}
      onMouseMove={onDrag}
      onMouseUp={stopDrag}
      style={{ left: _position.x, top: _position.y }}
    >
      {children}
    </div>
  );
};

export default Draggable;
