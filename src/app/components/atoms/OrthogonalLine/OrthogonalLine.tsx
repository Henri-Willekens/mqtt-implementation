import OrthologalLineProps from './OrthogonalLine.types';

import './OrthogonalLine.scss';
import { useEffect } from 'react';

const OrthologalLine: React.FC<OrthologalLineProps> = ({ from, to, type, content }) => {
  let pathData = '';
  let state = Math.floor(Math.random() * 2);

  console.log(from.props)
  console.log(to.props)

  // Calculate middle points of 'from' and 'to' elements, for element to valve
  const fromMiddleX = Math.floor(from.props.xPos + (from.props.width / 2));
  const fromMiddleY = Math.floor(from.props.yPos + (from.props.height / 2) - 5);
  const toMiddleX = Math.floor(to.props.xPos + (to.props.width / 2));
  const toMiddleY = Math.floor(to.props.yPos - (to.props.height / 2) - 5);

  // Calculate the mid-point in the X direction for the path
  const _midX = (fromMiddleX + toMiddleX) / 2;

  // Generate path data for orthogonal lines
  if (fromMiddleX !== toMiddleX && fromMiddleY !== toMiddleY) {
    pathData = `
      M ${fromMiddleX}, ${fromMiddleY}
      L ${_midX}, ${fromMiddleY}
      L ${_midX}, ${toMiddleY}
      L ${toMiddleX}, ${toMiddleY}
    `;
  } else {
    pathData = `
      M ${fromMiddleX}, ${fromMiddleY}
      L ${toMiddleX}, ${toMiddleY}
    `;
  }

  return (
    <svg className='orthogonal-line'>
    { type == 'connection' ? (
      <path className='orthogonal-line__type__connection' d={pathData} />
    ) : (
      <path className={state == 0 ? 'orthogonal-line__state__empty ' : `orthogonal-line__type__pipe__${content}`} d={pathData} />
    )}
    </svg>
  )
};

export default OrthologalLine;