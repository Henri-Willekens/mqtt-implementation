import OrthologalLineProps from './OrthogonalLine.types';

const OrthologalLine: React.FC<OrthologalLineProps> = ({ from, to, filled }) => {
  const _color = filled ? 'blue' : 'gray';

  const _midX = (from.x + to.x) / 2;
  const _midY = (from.y + to.y) / 2;

  let pathData = '';

  if (from.x !== to.x && from.y !== to.y) {
    pathData = `
      M ${from.x},${from.y}
      L ${_midX},${from.y}
      L ${_midX},${to.y}
      L ${to.x},${to.y}
    `;
  } else {
    pathData = `
      M ${from.x},${from.y}
      L ${to.x},${to.y}
    `;
  };

  return (
    <svg style={{ position: 'absolute', top: 0, left: 0, overflow: 'visible' }}>
      <path d={pathData} fill='none' stroke={_color} strokeWidth={5} />
    </svg>
  )
};

export default OrthologalLine;