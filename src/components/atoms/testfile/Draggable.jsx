import React, { useState } from 'react';
import { gridPositions } from './Grid';
import './Draggable.css';

const Draggable = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const startDrag = (event) => {
    const rect = event.target.getBoundingClientRect();
    setOffset({ x: event.clientX - rect.left, y: event.clientY - rect.top });
    setDragging(true);
  };

  const onDrag = (event) => {
    if (dragging) {
      setPosition({ x: event.clientX - offset.x, y: event.clientY - offset.y });
    }
  };

  const stopDrag = () => {
    setDragging(false);
    snapToGrid();
  };

  const snapToGrid = () => {
    let closestPosition = gridPositions[0];
    let minDistance = Number.MAX_VALUE;

    gridPositions.forEach((gridPosition) => {
      const distance = Math.hypot(position.x - gridPosition.x, position.y - gridPosition.y);
      if (distance < minDistance) {
        closestPosition = gridPosition;
        minDistance = distance;
      }
    });

    setPosition({ x: closestPosition.x, y: closestPosition.y });
  };

  return (
    <div
      className="draggable"
      onMouseDown={startDrag}
      onMouseMove={onDrag}
      onMouseUp={stopDrag}
      style={{ left: position.x, top: position.y }}
    >
    </div>
  );
};

export default Draggable;
