import AlertBoxHeaderProps from './AlertBoxHeader.types';
import './AlertBoxHeader.scss';

import { useState } from 'react';
import Button from '../Button/Button';

const AlertBoxHeader: React.FC<AlertBoxHeaderProps> = ({ type, status }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const expandAlertBox = () => {
    setIsExpanded(!isExpanded);
  };

  return(
    <div className={`alertboxheader alertboxheader__${type} alertboxheader__${status}`}>
      <div className='alertboxheader__header' onClick={expandAlertBox}>
        <div>
          <img className='alertboxheader__icon' src={`./icons/alerts/${type}-${status}.svg`} alt={`Icon for type ${type}`} />
          <p className='alertboxheader__title'>GPS 1 failed</p>
        </div>
        <img className={isExpanded ? 'expanded': 'not-expanded'} src='./icons/general/chevron-left.svg' alt='Expanded icon' />
      </div>
    </div>
  );
};

export default AlertBoxHeader;