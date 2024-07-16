import React, { useEffect } from 'react';
import './Grid.scss';

const gridPositions = [
  { x: 1.5, y:1.5 },
  { x: 135, y: 1.5 },
  { x: 268, y: 1.5 },
  { x: 1.5, y: 135 },
  { x: 135, y: 135 },
  { x: 268, y: 135 },
  { x: 1.5, y: 268 },
  { x: 135, y: 268 },
  { x: 268, y: 268 }
];

const Grid = () => {
  useEffect(() => {
    function updateCoordinates() {
      const gridItems = document.querySelectorAll('.grid-square');
      gridItems.forEach(item => {
        const rect = item.getBoundingClientRect();
        const coordinates = item.querySelector('.coordinates');
        if (coordinates) {
          coordinates.textContent = `(${rect.left.toFixed(2)}, ${rect.top.toFixed(2)})`;
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
    <div className="grid-container">
      {Array.from({ length: 9 }).map((_, index) => (
        <div key={index} className="grid-square"><span className="coordinates"></span></div>
      ))}
    </div>
  );
};

export { Grid, gridPositions };
