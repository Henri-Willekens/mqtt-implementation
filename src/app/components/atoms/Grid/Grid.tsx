import { useContext, useEffect } from 'react';
import './Grid.scss';
import { CurrentThemeContext } from 'src/app/contexts/CurrentTheme';

const _gridPositions: [{ element?: any, x: number, y: number, width: number, height: number}] = [{ x: 0, y: 0, width: 0, height: 0 }];

const Grid: React.FC = () => {
  const { _currentTheme } = useContext(CurrentThemeContext);

  useEffect(() => {
    function updateCoordinates() {
      const _gridItems = document.querySelectorAll('.grid-square');
      _gridItems.forEach(_item => {
        const _rect = _item.getBoundingClientRect();
        const _coordinates = _item.querySelector('.coordinates');
        if (_coordinates) {
          _gridPositions.push({ element: _item, x: _rect.left, y: _rect.top, width: _rect.width, height: _rect.height });
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
    <div className={`grid-container`}>
      {Array.from({ length: 9 }).map((_, _index) => (
        <div key={_index} className={`grid-square grid-square__${_currentTheme}`}><span className='coordinates'></span></div>
      ))}
    </div>
  );
};

export { Grid, _gridPositions };
