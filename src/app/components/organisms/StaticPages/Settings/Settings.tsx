import './Settings.scss';

import { useState, useContext, useEffect } from 'react';

import Button from '../../../atoms/Button/Button';
import InputField from 'src/app/components/atoms/FormInputs/InputField/InputField';

import { ConfigEnabledContext } from '../../../../contexts/ConfigEnabled';
import { ActiveConfigFileContext } from '../../../../contexts/ActiveConfigFile';
import { ThemeContext } from '../../../../contexts/Theme';

const SettingsPage = () => {
  const [_formValues, setFormValues] = useState({
    _configCode: '',
  });

  const { _currentTheme, setCurrentTheme } = useContext(ThemeContext);
  const { _configEnabled, setConfigEnabled } = useContext(ConfigEnabledContext);
  const { _activeConfigFile, setActiveConfigFile } = useContext(ActiveConfigFileContext);

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

  const toggleConfigMode = () => {
    if (_formValues._configCode == process.env.NEXT_PUBLIC_CONFIG_CODE) {
      setConfigEnabled(!_configEnabled);
    };
  };

  const ChangeConfig = (ActiveConfig: string) => {
    switch (ActiveConfig) {
      case 'ConfigA':
        setActiveConfigFile('ConfigA');
        break;
      case 'ConfigB':
        setActiveConfigFile('ConfigB');
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

    if (_value === process.env.NEXT_PUBLIC_CONFIG_CODE) {
      sessionStorage.setItem('configCode', _value);
    } else if (_value != process.env.NEXT_PUBLIC_CONFIG_CODE && sessionStorage.getItem('configCode') != null) {
      sessionStorage.removeItem('configCode');
    };
  };

  useEffect(() => {
    if (sessionStorage.getItem('configCode') === null) {
      return;
    };

    setFormValues({
      _configCode: sessionStorage.getItem('configCode') as string
    });
  }, []);

  return (
    <div className='settings'>
      <h2>Settings</h2>
      <div className='settings__buttons'>
        <div className='settings__themes settings__block'>
          <h3>Themes</h3>
          <div className='settings__themes__buttons'>
            <Button 
              value='Day' 
              onClick={() => switchTheme('day')} 
              extraClasses={`settings__button ${_currentTheme == 'day' && 'active'}`} 
            />
            <Button 
              value='Night' 
              onClick={() => switchTheme('night')} 
              extraClasses={`settings__button ${_currentTheme == 'night' && 'active'}`} 
            />
          </div>
        </div>
        <div className='settings__configuration settings__block'>
          <h3>Configuration</h3>
          <InputField type='text' label='Access code' id='_configCode' value={_formValues._configCode} onChange={handleFormChange} placeholder='xxx-xxx' />
          {_formValues._configCode === process.env.NEXT_PUBLIC_CONFIG_CODE && 
            <Button 
              value={`Turn config mode ${_configEnabled ? 'off' : 'on'}`} 
              onClick={toggleConfigMode} 
              extraClasses={`settings__button settings__configuration__button ${_configEnabled && 'active'}`} 
            />
          }
        </div>
        <div className='settings__active-config settings__block'>
          <h3>Active configuration file</h3>
          <div className='settings__themes__buttons'>
            <Button 
              value='Config' 
              onClick={() => ChangeConfig('ConfigA')} 
              extraClasses={`settings__button ${_activeConfigFile == 'ConfigA' && 'active'} `} 
            />
            <Button 
              value='Example Config' 
              onClick={() => ChangeConfig('ConfigB')} 
              extraClasses={`settings__button ${_activeConfigFile == 'ConfigB' && 'active'} `} 
            />
          </div>
        </div>
        <div className='settings__others settings__block'>
          <h3>Other settings</h3>
          <p>Coming soon...</p>
        </div>
        {/* 
        <div className='Config'>
          <label>Config:</label>
          <Button extraClasses={`Btn ${_configEnabled && 'active'} `} onClick={toggleConfigMode} value='Config' />
        </div>
        <div className='ActiveConfig'>
          <label>Active config file:</label>
          <Button extraClasses={`Btn ${_activeConfig == 'ConfigA' && 'active'} `} onClick={() => ChangeConfig('ConfigA')} value='Config' />
          <Button extraClasses={`Btn ${_activeConfig == 'ConfigB' && 'active'} `} onClick={() => ChangeConfig('ConfigB')} value='Example Config' />
        </div> */}
      </div>
    </div>
  );
};

export default SettingsPage;