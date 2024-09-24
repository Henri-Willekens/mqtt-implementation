import RudderProps from './Rudder.types';
import './Rudder.scss';

import { useEffect, useState } from 'react';
import FormModal from '../../molecules/FormModal/FormModal';
import InputField from '../FormInputs/InputField/InputField';
import { Config } from 'src/app/configuration/types';

const Rudder: React.FC<RudderProps> = ({ id, totalRudderAngle = 270, width = 255, height = 255, activePageId, configEnabled }) => {
  const [_isModalOpen, setIsModalOpen] = useState(false);
  const [_configData, setConfigData] = useState<Config>();
  const [_formValues, setFormValues] = useState({
    totalRudderAngle: totalRudderAngle,
    width: width,
    height: height
  });

  const determineRudderAngle = () => {
    const _elementRadius = 125;
    const _centerX = _elementRadius;
    const _centerY = _elementRadius;

    // Determine half of the angle, so one half can be colored green, and the other red
    const angle = totalRudderAngle / 2;

    // Calculate the endpoint of the arc for port side
    const _portAngle = angle * Math.PI / 180;
    const _portX = _centerX + _elementRadius * Math.sin(_portAngle);
    const _portY = _centerY - _elementRadius * Math.cos(_portAngle);

    // Calculate the endpoint of the arc for starboard side
    const _starboardAngle = -angle * Math.PI / 180;
    const _starboardX = _centerX + _elementRadius * Math.sin(_starboardAngle);
    const _starboardY = _centerY - _elementRadius * Math.cos(_starboardAngle);

    return (
      <g>
        <path className='rudder-port' d={`M${_centerX},${_centerY} L${_centerX},${_centerY - _elementRadius} A${_elementRadius},${_elementRadius} 0 0,1 ${_portX},${_portY} Z`} />
        <path className='rudder-starboard' d={`M${_centerX},${_centerY} L${_centerX},${_centerY - _elementRadius} A${_elementRadius},${_elementRadius} 0 0,0 ${_starboardX},${_starboardY} Z`} />
      </g>
    );
  };

  const updateRudderPosition = (updatedAngle: number) => {
    const rudderPointer = document.getElementById('rudder-pointer');
    rudderPointer?.setAttribute('transform', `rotate(${updatedAngle}, ${width / 2}, ${height / 2})`)
  };


  const openModal = () => {
    if (configEnabled) {
      setIsModalOpen(true);
      fetch('/api/read-json?file=config.json')
        .then((res) => res.json())
        .then((results) => {
          setConfigData(results);
        })
        .catch((err) => console.error(err));
    };
  };


  const closeModal = () => {
    setIsModalOpen(false);
  };

  const submitForm = () => {
    handleSave();
    closeModal();
  };


  const handleFormChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const _name = event.target.name;
    const _value = event.target.value;

    setFormValues((_prevFormValues) => ({
      ..._prevFormValues,
      [_name]: _value
    }));
  };


  const handleSave = () => {
    if (_configData === undefined) {
      return;
    }

    let _pageIndex = _configData.pages.findIndex((_o) => _o.id === activePageId);
    let _index = _configData.pages[_pageIndex].components.findIndex((_o) => _o.props.id === id);

    _configData.pages[_pageIndex].components[_index] = {
      type: _configData.pages[_pageIndex]?.components[_index].type,
      props: {
        ..._configData.pages[_pageIndex].components[_index].props,
        totalRudderAngle: parseInt(_formValues.totalRudderAngle),
        width: parseInt(_formValues.width),
        height: parseInt(_formValues.height)
      }
    };

    fetch('/api/write-json', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(_configData),
    })
      .then((response) => response.json())
      .catch((error) => console.error('Error saving data:', error));
  };


  useEffect(() => {
    updateRudderPosition(0)
  }, [])

  return (
    <>
      <div key={id} onDoubleClick={openModal}>
        <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
          <circle cx='125' cy='125' r='125' className='outer-circle' />

          <g className='port-starboard'>
            {determineRudderAngle()}
          </g>

          <circle cx='125' cy='125' r='100' className='inner-circle' />

          <g className='boat'>
            <path className='boat-fill' fillRule='evenodd' clipRule='evenodd' d='M101 17.4787V133C101 135.761 103.239 138 106 138H140C142.761 138 145 135.761 145 133V17.4787C137.97 15.208 130.598 14 123 14C115.402 14 108.03 15.208 101 17.4787Z' />
            <path className='boat-stroke' d='M101 17.4787L100.693 16.5271L100 16.7508V17.4787H101ZM145 17.4787H146V16.7508L145.307 16.5271L145 17.4787ZM102 133V17.4787H100V133H102ZM106 137C103.791 137 102 135.209 102 133H100C100 136.314 102.686 139 106 139V137ZM140 137H106V139H140V137ZM144 133C144 135.209 142.209 137 140 137V139C143.314 139 146 136.314 146 133H144ZM144 17.4787V133H146V17.4787H144ZM145.307 16.5271C138.18 14.2251 130.705 13 123 13V15C130.491 15 137.759 16.1908 144.693 18.4303L145.307 16.5271ZM123 13C115.295 13 107.82 14.2251 100.693 16.5271L101.307 18.4303C108.241 16.1908 115.509 15 123 15V13Z' />
          </g>

          <g id='rudder-pointer' className='pointer'>
            <path fillRule='evenodd' clipRule='evenodd' d='M133.988 125.101C133.996 124.942 134 124.782 134 124.62C134 119.307 129.523 115 124 115C118.477 115 114 119.307 114 124.62C114 124.782 114.004 124.942 114.012 125.101H114L123.231 229L133.94 125.68C133.947 125.618 133.954 125.555 133.959 125.492L134 125.101H133.988Z' fill='#EFEFEF' />
          </g>

          <defs>
            <linearGradient id='paint0_linear_1037_1650' x1='125' y1='24' x2='125' y2='226' gradientUnits='userSpaceOnUse'>
              <stop stopColor='#7474B9' />
              <stop offset='1' stopColor='#343453' />
            </linearGradient>
            <linearGradient id='paint1_linear_1037_1650' x1='-4.99315' y1='129.402' x2='248.743' y2='127.681' gradientUnits='userSpaceOnUse'>
              <stop offset='0.5' stopColor='#138517' />
              <stop offset='0.5' stopColor='#851111' />
            </linearGradient>
            <linearGradient id='paint2_linear_1037_1650' x1='121.228' y1='1.67226' x2='122.522' y2='255.411' gradientUnits='userSpaceOnUse'>
              <stop stopColor='#343453' />
              <stop offset='1' stopColor='#7474B9' />
            </linearGradient>
          </defs>
        </svg>
      </div>
      <FormModal isOpen={_isModalOpen} onSubmit={submitForm} onCancel={closeModal}>
        <InputField label='Total angle' type='number' id='totalRudderAngle' value={_formValues.totalRudderAngle} onChange={handleFormChange} />
        <InputField label='Width (px)' type='number' id='width' value={_formValues.width} onChange={handleFormChange} />
        <InputField label='Height (px)' type='number' id='height' value={_formValues.height} onChange={handleFormChange} />
      </FormModal>
    </>
  );
};

export default Rudder;