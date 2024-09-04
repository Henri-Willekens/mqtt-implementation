import OrthologalLineProps from './OrthogonalLine.types';

import './OrthogonalLine.scss';

const OrthologalLine: React.FC<OrthologalLineProps> = ({ from, to, fromConnectionPosition, toConnectionPosition, type, content }) => {
  let pathData = '';
  const _midX =(from.props.xPos + to.props.xPos) / 2;


  if (from.props.xPos !== to.props.xPos && from.props.yPos !== to.props.yPos) {
    pathData = `
      M ${from.props.xPos}, ${from.props.yPos}
      L ${_midX}, ${from.props.yPos}
      L ${_midX}, ${to.props.yPos}
      L ${to.props.xPos}, ${to.props.yPos}
    `;
  } else {
    pathData = `
      M ${from.props.xPos}, ${from.props.yPos}
      L ${to.props.xPos}, ${to.props.yPos}
    `;
  }


  return (
    <svg className='orthogonal-line'>
      <path className={type == 'connection' ? 'orthogonal-line__type__connection': `orthogonal-line__type__pipe__${content}`} d={pathData} />
    </svg>
  )
};

export default OrthologalLine;