import OrthologalLineProps from './OrthogonalLine.types';
import './OrthogonalLine.scss';

const OrthologalLine: React.FC<OrthologalLineProps> = ({ from, to, type, content }) => {
  let _pathData = '';
  let _state = Math.floor(Math.random() * 2);

  // Calculate middle points of 'from' and 'to' elements, for element to valve
  // const _fromMiddleX = Math.floor(from.props.xPos + (from.props.width / 2));
  // const _fromMiddleY = Math.floor(from.props.yPos + (from.props.height / 2));
  // const _toMiddleX = Math.floor(to.props.xPos + (to.props.width / 2));
  // const _toMiddleY = Math.floor(to.props.yPos + (to.props.height / 2));
  console.log(`x${from.props.xPos} y${from.props.yPos}`)
  console.log(`x${to.props.xPos} y${to.props.yPos}`)

  const _fromMiddleX = Math.floor(from.props.xPos + (from.props.width / 2));
  const _fromMiddleY = Math.floor(from.props.yPos + (from.props.height / 2) - 10);
  const _toMiddleX = Math.floor(to.props.xPos + (to.props.width / 2));
  const _toMiddleY = Math.floor(to.props.yPos + (to.props.height / 2) - 10);

  // Calculate the mid-point in the X direction for the path
  const _midX = (_fromMiddleX + _toMiddleX) / 2;

  // Generate path data for orthogonal lines
  if (_fromMiddleX !== _toMiddleX && _fromMiddleY !== _toMiddleY) {
    _pathData = `
      M ${_fromMiddleX}, ${_fromMiddleY}
      L ${_midX}, ${_fromMiddleY}
      L ${_midX}, ${_toMiddleY}
      L ${_toMiddleX}, ${_toMiddleY}
    `;
  } else {
    _pathData = `
      M ${_fromMiddleX}, ${_fromMiddleY}
      L ${_toMiddleX}, ${_toMiddleY}
    `;
  }

  return (
    <svg className='orthogonal-line'>
    { type == 'connection' ? (
      <path className='orthogonal-line__type__connection' d={_pathData} />
    ) : (
      <path className={_state == 0 ? 'orthogonal-line__state__empty ' : `orthogonal-line__type__pipe__${content}`} d={_pathData} />
    )}
    </svg>
  )
};

export default OrthologalLine;