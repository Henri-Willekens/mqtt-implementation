import DraggProps from './Draggable.types';
import './Draggable.scss';

import { useContext, useEffect, useState } from 'react';

import { _gridPositions } from '../Grid/Grid';

import { ConfigEnabledContext } from '../../../contexts/ConfigEnabled';
import { Config } from 'src/app/configuration/types';
import { ActiveConfigFileContext } from 'src/app/contexts/ActiveConfigFile';
import { ConfigDataContext } from 'src/app/contexts/ConfigData';
import { ActivePageIdContext } from 'src/app/contexts/ActivePageId';

const Draggable: React.FC<DraggProps> = ({ 
  id, 
  elementInsideId,
  gridEnabled,
  children
}) => {
  const { _configEnabled } = useContext(ConfigEnabledContext);
  const { _activeConfigFile } = useContext(ActiveConfigFileContext);
  const { setConfigData } = useContext(ConfigDataContext);
  const { _activePageId } = useContext(ActivePageIdContext);

  const [_position, setPosition] = useState({ x: 50, y: 50 });
  const [_elementSize, setElementSize] = useState({ width: 100, height: 100 });
  const [_dragging, setDragging] = useState(false);
  const [_offset, setOffset] = useState({ x: 0, y: 0 });
  const [_data, setData] = useState<Config>();
  const _SNAPPABLE = ['Compass', 'Rudder']

  const startDrag = (_event: any) => {
    if (_configEnabled && document.querySelector("dialog:modal") === null) {
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
      if (gridEnabled && _SNAPPABLE.includes(children?.props.type)) {
        snapToGrid();
      }
      handleSave();
    }
  };


  const handleSave = () => {
    if (_data === undefined) {
      return;
    }

    if (gridEnabled && _SNAPPABLE.includes(children?.props.type)) {
      snapToGrid();
    }

    let _pageIndex = _data.pages.findIndex((_o) => _o.id === _activePageId);
    let _index = _data.pages[_pageIndex].components.findIndex((_o) => _o.props.id === elementInsideId);

    if (_SNAPPABLE.includes(children?.props.type)) {
      _data.pages[_pageIndex].components[_index] = {
        type: _data.pages[_pageIndex]?.components[_index].type,
        props: {
          ..._data.pages[_pageIndex].components[_index].props,
          xPos: _position.x,
          yPos: _position.y,
          width: _elementSize.width,
          height: _elementSize.height
        }
      };
    } else {
      _data.pages[_pageIndex].components[_index] = {
        type: _data.pages[_pageIndex]?.components[_index].type,
        props: {
          ..._data.pages[_pageIndex].components[_index].props,
          xPos: _position.x,
          yPos: _position.y
        }
      };
  
    };

    fetch('/api/write-json', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(_data),
    })
      .then(() => setConfigData(_data))
      .catch((error) => console.error('Error saving data:', error));
  };


  const fetchConfig = () => {
    const _fileToFetch = _activeConfigFile == 'ConfigA' ? 'config.json' : 'example.config.json';
    fetch(`/api/read-json?file=${_fileToFetch}`)
      .then((res) => res.json())
      .then((results) => {
        setData(results);

        let _pageIndex = results.pages.findIndex((_o) => _o.id === _activePageId);
        let _index = results.pages[_pageIndex].components.findIndex((_o) => _o.props.id === elementInsideId)

        setPosition({ x: results.pages[_pageIndex].components[_index].props.xPos, y: results.pages[_pageIndex].components[_index].props.yPos })

        // Snappable also determines if a element should scale or not with a grid
        if (gridEnabled && _SNAPPABLE.includes(children?.props.type)) {
          snapToGrid({ x: results.pages[_pageIndex].components[_index].props.xPos, y: results.pages[_pageIndex].components[_index].props.yPos });
        }
      })
      .catch((err) => console.error(err));
  }


  const snapToGrid = (_fetchedPosition?: { x: number, y: number }) => {
    let _closestPosition = _gridPositions[0];
    let _minDistance = Number.MAX_VALUE;

    _gridPositions.forEach((_gridPosition) => {
      const _distance = _fetchedPosition ? Math.hypot(_fetchedPosition.x - _gridPosition.x, _fetchedPosition.y - _gridPosition.y) : Math.hypot(_position.x - _gridPosition.x, _position.y - _gridPosition.y);
      if (_distance < _minDistance) {
        _closestPosition = _gridPosition;
        _minDistance = _distance;
      }
    });

    setPosition({ x: _closestPosition.x + 10, y: _closestPosition.y + 10 });
    
    // Adjust width and height accordingly
    let _adjustedWidth = Math.floor(_closestPosition.width) - 40;
    let _adjustedHeight = Math.floor(_closestPosition.height) - 40;

    let _e = document.getElementById(`draggable-${elementInsideId}`);
    if (_e != null) {
      _e.style.width = `${_adjustedWidth}px`;
      _e.style.height = `${_adjustedHeight}px`;
    };
    setElementSize({width: _adjustedWidth, height: _adjustedHeight});
  };


  useEffect(() => {
    fetchConfig();
  }, []);

  return (
    <div
      id={`draggable-${elementInsideId}`}
      className={_configEnabled ? 'draggable' : 'non-draggable'}
      onMouseDown={startDrag}
      onMouseMove={onDrag}
      onMouseUp={stopDrag}
      key={id}
      style={{ left: `${_position.x}px`, top: `${_position.y}px`, zIndex: _dragging ? 1000 : 1 }}
    >
      {children}
    </div>
  );
};

export default Draggable;
