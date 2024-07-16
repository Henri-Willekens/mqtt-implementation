import React, { useEffect } from 'react';
import './Grid.scss';

const gridPositions: [{x: number, y: number}] = [{ x: 0, y: 0 }];

const Grid = () => {
  useEffect(() => {
    function updateCoordinates() {
      const gridItems = document.querySelectorAll('.grid-square');
      gridItems.forEach(item => {
        const rect = item.getBoundingClientRect();
        const coordinates = item.querySelector('.coordinates');
        if (coordinates) {
          gridPositions.push({ x: rect.left, y: rect.top });
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
