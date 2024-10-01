import AlertBoxHeaderProps from './AlertBoxHeader.types';
import './AlertBoxHeader.scss';

import { useState } from 'react';

import Button from '../Button/Button';

const AlertBoxHeader: React.FC<AlertBoxHeaderProps> = ({ type, status }) => {
  const [_isExpanded, setIsExpanded] = useState(false);

  const expandAlertBox = () => {
    setIsExpanded(!_isExpanded);
  };

  return (
    <div className={`alertboxheader alertboxheader__${type} alertboxheader__${status} ${_isExpanded ? 'not-center' : ''}`}>
      <div className='alertboxheader__header' onClick={expandAlertBox}>
        <div>
          <img className='alertboxheader__icon' src={`./icons/alerts/${type}-${status}.svg`} alt={`Icon for type ${type}`} />
          <p className='alertboxheader__title'>GPS 1 failed</p>
        </div>
        <img className={_isExpanded ? 'expanded' : 'not-expanded'} src='./icons/general/chevron-left.svg' alt='Expanded icon' />
      </div>
      {_isExpanded && (
        <div className='alertboxheader__body'>
          <p>GPS 1 has failed to fetch data from GPS sensor.</p>
          <div className='alertboxheader__body__buttons'>
            <Button value='ACK' onClick={() => { }} extraClasses='btn-full-width' />
            <Button value='MUTE' onClick={() => { }} extraClasses='btn-full-width' />
          </div>
        </div>
      )}
    </div>
  );
};

export default AlertBoxHeader;