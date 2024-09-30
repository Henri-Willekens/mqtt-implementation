import './Settings.scss';

import { useState, useContext } from 'react';

import Button from '../../../atoms/Button/Button';
import InputField from 'src/app/components/atoms/FormInputs/InputField/InputField';

import { ConfigEnabledContext } from '../../../../contexts/ConfigEnabled';
import { ConfigFileContext } from '../../../../contexts/ConfigFile';
import { ThemeContext } from '../../../../contexts/Theme';

const SettingsPage = () => {
  const [_formValues, setFormValues] = useState({
    _configCode: '',
  });

  const { _currentTheme, setCurrentTheme } = useContext(ThemeContext);
  const [_gridEnabled, setGridEnabled] = useState(true);
  const { _configEnabled, setConfigEnabled } = useContext(ConfigEnabledContext);
  const { _activeConfig, setActiveConfig } = useContext(ConfigFileContext);

  const switchTheme = (theme: string) => {
    switch (theme) {
      case 'night':
        setCurrentTheme('night');
        break;
      case 'day':
        setCurrentTheme('day');
        break;
      default:
        break;
    }
  };

  const toggleGrid = () => {
    setGridEnabled(!_gridEnabled);
  };

  const toggleConfigMode = () => {
    if (_formValues._configCode == process.env.NEXT_PUBLIC_CONFIG_CODE) {
      setConfigEnabled(!_configEnabled);
    };
  };

  const ChangeConfig = (ActiveConfig: string) => {
    switch (ActiveConfig) {
      case 'ConfigA':
        setActiveConfig('ConfigA');
        break;
      case 'ConfigB':
        setActiveConfig('ConfigB');
        break;
      default:
        break;
    }
  };

  const handleFormChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const _name = event.target.name;
    const _value = event.target.value;

    setFormValues((_prevFormValues) => ({
      ..._prevFormValues,
      [_name]: _value
    }));
  };

  return (
    <div className='Settings'>
      <h2>Settings</h2>
      <div className='Buttons'>
        <div className='Themes'>
          <label>Themes:</label>
          <Button extraClasses={`Btn ${_currentTheme == 'day' && 'active'} `} onClick={() => switchTheme('day')} value='Day' />
          <Button extraClasses={`Btn ${_currentTheme == 'night' && 'active'} `} onClick={() => switchTheme('night')} value='Night' />
        </div>
        <div className='Config'>
          <label>Config:</label>
          <Button extraClasses={`Btn ${_configEnabled && 'active'} `} onClick={toggleConfigMode} value='Config' />
          <InputField type='text' label='Access code' id='_configCode' value={_formValues._configCode} onChange={handleFormChange} placeholder='xxx-xxx' />
        </div>
        <div className='Grid'>
          <label>Grid:</label>
          <Button extraClasses='Btn' onClick={toggleGrid} value='Grid' />
        </div>
        <div className='ActiveConfig'>
          <label>Active config file:</label>
          <Button extraClasses={`Btn ${_activeConfig == 'ConfigA' && 'active'} `} onClick={() => ChangeConfig('ConfigA')} value='Config' />
          <Button extraClasses={`Btn ${_activeConfig == 'ConfigB' && 'active'} `} onClick={() => ChangeConfig('ConfigB')} value='Example Config' />
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;