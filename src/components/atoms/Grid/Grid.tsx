import React from 'react';
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
  return (
    <div className="grid-container">
      {Array.from({ length: 9 }).map((_, index) => (
        <div key={index} className="grid-square"></div>
      ))}
    </div>
  );
};

export { Grid, gridPositions };
