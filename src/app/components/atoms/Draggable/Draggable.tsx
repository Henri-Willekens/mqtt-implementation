import { useContext, useEffect, useState } from 'react';
import { _gridPositions } from '../Grid/Grid';

import DraggProps from './Draggable.types';
import './Draggable.scss';
import { Config } from 'src/app/configuration/types';
import { ConfigContext } from '../../../contexts/Config';

const Draggable: React.FC<DraggProps> = ({ id, children, elementInsideId, gridEnabled, activePageId}) => {
  const [_position, setPosition] = useState({ x: 50, y: 50 });
  const [_dragging, setDragging] = useState(false);
  const [_offset, setOffset] = useState({ x: 0, y: 0 });
  const { _configEnabled } = useContext(ConfigContext);
  const [_data, setData] = useState<Config>();


  const startDrag = (_event: any) => {
    if (_configEnabled) {
      const _rect = _event.target.getBoundingClientRect();
      setOffset({ x: _event.clientX - _rect.left, y: _event.clientY - _rect.top });
      setDragging(true);
      fetchConfig();
    }
  };


  const onDrag = (_event: any) => {
    if (_dragging) {
      setPosition({ x: _event.clientX - _offset.x, y: _event.clientY - _offset.y });
    }
  };


  const stopDrag = () => {
    if (_configEnabled) {
      setDragging(false);
      if (gridEnabled) {
        snapToGrid();
      }
      handleSave();
    }
  };


  const handleSave = () => {
    if (_data === undefined) {
      return;
    }

    if (gridEnabled) {
      snapToGrid();
    }
    console.log(_position)

    let _pageIndex = _data.pages.findIndex((_o) => _o.id === activePageId);
    let _index = _data.pages[_pageIndex].components.findIndex((_o) => _o.props.id === elementInsideId);

    _data.pages[_pageIndex].components[_index] = {
      type: _data.pages[_pageIndex]?.components[_index].type,
      props: {
        ..._data.pages[_pageIndex].components[_index].props,
        xPos: _position.x,
        yPos: _position.y
      }
    };

    fetch("/api/write-json", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(_data),
    })
      .then((response) => response.json())
      .then((result) => {
        console.log(result.message);
      })
      .catch((error) => console.error("Error saving data:", error));
  };


  const fetchConfig = () => {
    fetch("/api/read-json")
    .then((res) => res.json())
    .then((results) => { 
      setData(results);
      
      let _pageIndex = results.pages.findIndex((_o) => _o.id === activePageId);
      let _index = results.pages[_pageIndex].components.findIndex((_o) => _o.props.id === elementInsideId)

      setPosition({x:results.pages[_pageIndex].components[_index].props.xPos, y: results.pages[_pageIndex].components[_index].props.yPos})

      if (gridEnabled) {
        snapToGrid({x:results.pages[_pageIndex].components[_index].props.xPos, y: results.pages[_pageIndex].components[_index].props.yPos});
      }
    })
    .catch((err) => console.error(err));
  }


  const snapToGrid = (_fetchedPosition?: { x: number, y: number }) => {
    let _closestPosition = _gridPositions[0];
    let _minDistance = Number.MAX_VALUE;

    _gridPositions.forEach((_gridPosition) => {
      const distance = _fetchedPosition ? Math.hypot(_fetchedPosition.x - _gridPosition.x, _fetchedPosition.y - _gridPosition.y) : Math.hypot(_position.x - _gridPosition.x, _position.y - _gridPosition.y);
      if (distance < _minDistance) {
        _closestPosition = _gridPosition;
        _minDistance = distance;
      }
    });

    setPosition({ x: _closestPosition.x, y: _closestPosition.y });
  };


  useEffect(() => {
    fetchConfig();
  }, []);


  return (
    <div
      className={_configEnabled ? "draggable" : "non-draggable"}
      onMouseDown={startDrag}
      onMouseMove={onDrag}
      onMouseUp={stopDrag}
      key={id}
      style={{ left: _position.x, top: _position.y }}
    >
      {children}
    </div>
  );
};

export default Draggable;
