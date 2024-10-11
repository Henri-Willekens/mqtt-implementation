import './Valve.scss';
import ValveProps from './Valve.types';

import React, { useContext, useState } from 'react';

import FormModal from '../../molecules/FormModal/FormModal';
import SelectField from '../FormInputs/SelectField/SelectField';

import { ConfigDataContext } from 'src/app/contexts/ConfigData';

const Valve: React.FC<ValveProps> = ({ 
  id, 
  content = '', 
  configEnabled,
  activePageId
}) => {
  const { _configData } = useContext(ConfigDataContext);
  const [_enabled, setEnabled] = useState(false);
  const [_isModalOpen, setIsModalOpen] = useState(false);
  const [_formValues, setFormValues] = useState({
    _content: content
  });

  const openModal = () => {
    if (configEnabled) {
      setIsModalOpen(true);
    };
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const submitForm = () => {
    handleSave();
    closeModal();
  };

  const handleSave = () => {
    if (_configData === undefined || _configData === null) {
      return;
    }

    let _pageIndex = _configData.pages.findIndex((_o) => _o.id === activePageId);
    let _index = _configData.pages[_pageIndex].components.findIndex((_o) => _o.props.id === id);

    _configData.pages[_pageIndex].components[_index] = {
      type: _configData.pages[_pageIndex]?.components[_index].type,
      props: {
        ..._configData.pages[_pageIndex].components[_index].props,
        content: _formValues._content,
        width: 72,
        height: 48
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

  const handleFormChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const _name = event.target.name;
    const _value = event.target.value;

    setFormValues((_prevFormValues) => ({
      ..._prevFormValues,
      [_name]: _value
    }));
  };

  const turnOnOrOff = () => {
    setEnabled(!_enabled);
  };

  return (
    <>
      <div onDoubleClick={openModal} className={`valve ${id}`} onClick={configEnabled ? () => { } : turnOnOrOff}>
        <svg width='72' height='48' viewBox='0 0 30 28'>
        {/* fill  */}
          <path className='valve-fill__stroke' d='M 0.04860905,23.977543 C 0.0286728,23.957943 0.0125,21.004963 0.0125,17.415283 v -6.5267 h 1.8864493 1.8864494 l 0.8612266,1.09372 0.8612263,1.09371 h 1.9706395 1.9706188 l 0.449624,-0.41924 c 0.2472911,-0.23057 0.6710081,-0.55943 0.9416031,-0.7308 l 0.491988,-0.31157 v -0.67509 -0.67509 l -0.541616,-0.5629996 -0.541615,-0.56299 v -0.6987 -0.6987 h 1.218645 1.218635 v -0.987 -0.98701 h 1.787338 1.787348 v 0.98701 0.987 h 1.218645 1.218635 v 0.6987 0.6987 l -0.541616,0.56299 -0.541615,0.5629996 v 0.67509 0.67509 l 0.491978,0.31157 c 0.270596,0.171368 0.694332,0.50023 0.941613,0.7308 l 0.449613,0.41924 h 1.970619 1.97064 l 0.861226,-1.09371 0.861237,-1.09372 h 1.886663 1.886663 l -0.01373,6.54893 -0.01373,6.54893 -1.868588,0.0124 -1.868578,0.0124 -0.859609,-1.09274 -0.859589,-1.09274 h -1.989386 -1.989375 l -0.390802,0.36926 c -2.027885,1.91605 -5.092426,2.36583 -7.609614,1.11685 -0.567339,-0.2815 -1.059137,-0.620568 -1.5956954,-1.10013 L 9.4448074,21.825763 H 7.4704046 5.4959916 l -0.8595989,1.09225 -0.8595992,1.09224 -1.8460072,0.001 c -1.01531562,8.1e-4 -1.86227147,-0.0145 -1.88213655,-0.0341 z ' />
          <path className={_enabled ? `valve-fill__${content} valve-fill` : 'valve-fill valve-fill__empty'} d='M 0.04860905,23.977543 C 0.0286728,23.957943 0.0125,21.004963 0.0125,17.415283 v -6.5267 h 1.8864493 1.8864494 l 0.8612266,1.09372 0.8612263,1.09371 h 1.9706395 1.9706188 l 0.449624,-0.41924 c 0.2472911,-0.23057 0.6710081,-0.55943 0.9416031,-0.7308 l 0.491988,-0.31157 v -0.67509 -0.67509 l -0.541616,-0.5629996 -0.541615,-0.56299 v -0.6987 -0.6987 h 1.218645 1.218635 v -0.987 -0.98701 h 1.787338 1.787348 v 0.98701 0.987 h 1.218645 1.218635 v 0.6987 0.6987 l -0.541616,0.56299 -0.541615,0.5629996 v 0.67509 0.67509 l 0.491978,0.31157 c 0.270596,0.171368 0.694332,0.50023 0.941613,0.7308 l 0.449613,0.41924 h 1.970619 1.97064 l 0.861226,-1.09371 0.861237,-1.09372 h 1.886663 1.886663 l -0.01373,6.54893 -0.01373,6.54893 -1.868588,0.0124 -1.868578,0.0124 -0.859609,-1.09274 -0.859589,-1.09274 h -1.989386 -1.989375 l -0.390802,0.36926 c -2.027885,1.91605 -5.092426,2.36583 -7.609614,1.11685 -0.567339,-0.2815 -1.059137,-0.620568 -1.5956954,-1.10013 L 9.4448074,21.825763 H 7.4704046 5.4959916 l -0.8595989,1.09225 -0.8595992,1.09224 -1.8460072,0.001 c -1.01531562,8.1e-4 -1.86227147,-0.0145 -1.88213655,-0.0341 z ' />
          <path className='valve-top' d='m 6.6023734,4.1842334 c -0.060724,-0.0598 -0.041195,-3.27926899 0.021055,-3.50061899 0.076897,-0.27259 0.3429955,-0.5585 0.5840005,-0.62734 0.1252425,-0.0358 0.7635085,-0.0507 1.735859,-0.0407 l 1.5377891,0.0159 0.360226,0.82695 0.360226,0.82694999 0.794715,0.0147 0.794704,0.0148 0.105571,-0.20389 c 0.138414,-0.26726 0.54605,-0.63333999 0.863474,-0.77545999 0.357175,-0.15992 1.07007,-0.15992 1.427234,0 0.317434,0.14212 0.72505,0.50819999 0.863474,0.77545999 l 0.105571,0.20389 0.794715,-0.0148 0.794704,-0.0147 0.360226,-0.82694999 0.360237,-0.82695 1.537778,-0.0159 c 0.972341,-0.0101 1.610606,0.005 1.735859,0.0407 0.244392,0.0698 0.509616,0.35808 0.58577,0.63668 0.03591,0.13156 0.05198,0.82077999 0.04292,1.85467899 l -0.01434,1.64531 -7.8578,0.0135 c -4.321788,0.007 -7.8741259,-0.003 -7.8940929,-0.0222 z' />
          </svg>
      </div>
      <FormModal isOpen={_isModalOpen} onSubmit={submitForm} onCancel={closeModal}>
        <SelectField label='Content' id='_content' value={_formValues._content} onChange={handleFormChange} options={['clean-water', 'sea-water', 'fuel', 'oil']} />
      </FormModal>
    </>
  );
};

export default Valve;