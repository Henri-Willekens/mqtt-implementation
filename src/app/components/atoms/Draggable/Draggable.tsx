import { useEffect, useState } from 'react';
import { _gridPositions } from '../Grid/Grid';

import DraggProps from './Draggable.types';
import './Draggable.scss';
import { ComponentConfig } from 'src/app/configuration/types';

const Draggable: React.FC<DraggProps> = ({ children, elementInsideId, gridEnabled, configMode }) => {
  const [_position, setPosition] = useState({ x: 0, y: 0 });
  const [_dragging, setDragging] = useState(false);
  const [_offset, setOffset] = useState({ x: 0, y: 0 });
  const [_data, setData] = useState<ComponentConfig[]>([]);


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
    handleSave();
  };


  const handleSave = () => {
    const elementConfig = _data.find((_o) => _o.props.id === elementInsideId);

    const newData = {
      components: [
        ..._data,
        {
          type: elementConfig?.type,
          props: {
            id: elementConfig?.props.id,
            xPos: 50
          }
        }
      ]
    }

    fetch("/api/write-json", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newData),
    })
      .then((response) => response.json())
      .then((result) => {
        console.log(result.message);
      })
      .catch((error) => console.error("Error saving data:", error));
  };


  useEffect(() => {
    fetch("/api/read-json")
      .then((res) => res.json())
      .then((results) => { 
        setData(results.components)
        // console.log(results.components.find((_o) => _o.props.id == elementInsideId))
      })
      .catch((err) => console.error(err));
  }, [])


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
