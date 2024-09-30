import { useEffect } from 'react';
import './Grid.scss';

const _gridPositions: [{ element?: any, x: number, y: number, width: number, height: number}] = [{ x: 0, y: 0, width: 0, height: 0 }];

const Grid = () => {
  useEffect(() => {
    function updateCoordinates() {
      const _gridItems = document.querySelectorAll('.grid-square');
      _gridItems.forEach(_item => {
        const _rect = _item.getBoundingClientRect();
        const _coordinates = _item.querySelector('.coordinates');
        if (_coordinates) {
          _gridPositions.push({ element: _item, x: _rect.left, y: _rect.top, width: _rect.width, height: _rect.height });

          // _coordinates.textContent = `(${_rect.left.toFixed(2)}, ${_rect.top.toFixed(2)})`;
        }
      });
    }

    // Initial coordinates update
    updateCoordinates();

    // Add event listeners
    window.addEventListener('resize', updateCoordinates);

    // Cleanup event listeners on component unmount
    return () => {
      window.removeEventListener('resize', updateCoordinates);
    };
  }, []);

  return (
    <div className='grid-container'>
      {Array.from({ length: 9 }).map((_, _index) => (
        <div key={_index} className='grid-square'><span className='coordinates'></span></div>
      ))}
    </div>
  );
};

export { Grid, _gridPositions };
