import './SettingsPage.scss';

import { useState, useContext, useEffect } from 'react';

import Button from '../../../atoms/Button/Button';
import InputField from 'src/app/components/atoms/FormInputs/InputField/InputField';

import useFormInput from 'src/app/hooks/useFormInput';
import { CurrentThemeContext } from 'src/app/contexts/CurrentTheme';
import { ActiveConfigFileContext } from 'src/app/contexts/ActiveConfigFile';
import { ConfigEnabledContext } from 'src/app/contexts/ConfigEnabled';

const SettingsPage: React.FC = () => {
  const [_initialValues, setInitialValues] = useState({
    _configCode: '',
  });
  const { _formValues, handleChange } = useFormInput(_initialValues);

  const { _currentTheme, setCurrentTheme } = useContext(CurrentThemeContext);
  const { _activeConfigFile, setActiveConfigFile } = useContext(ActiveConfigFileContext);
  const { _configEnabled, setConfigEnabled } = useContext(ConfigEnabledContext);

  useEffect(() => {
    if (sessionStorage.getItem('configCode') === null) {
      return;
    };

    setInitialValues({
      _configCode: sessionStorage.getItem('configCode') as string
    });
  }, []);

  useEffect(() => {
    // Store the configCode for the session, once sessions ends, removes code automatically
    // or if code no longer matches
    if (_formValues._configCode === process.env.NEXT_PUBLIC_CONFIG_CODE) {
      sessionStorage.setItem('configCode', _formValues._configCode);
    } else if (_formValues._configCode != process.env.NEXT_PUBLIC_CONFIG_CODE && sessionStorage.getItem('configCode') != null) {
      sessionStorage.removeItem('configCode');
    };
  }, [_formValues._configCode]);

  return(
    <div className='settings'>
      <h2>Settings</h2>
      <div className='settings__buttons'>
        <div className='settings__themes settings__block'>
          <h3>Themes</h3>
          <div className='settings__themes__buttons'>
            <Button 
              value='Day' 
              onClick={() => setCurrentTheme('day')} 
              extraClasses={`settings__button ${_currentTheme == 'day' && 'active'}`} 
            />
            <Button 
              value='Night' 
              onClick={() => setCurrentTheme('night')} 
              extraClasses={`settings__button ${_currentTheme == 'night' && 'active'}`} 
            />
          </div>
        </div>
        <div className='settings__configuration settings__block'>
          <h3>Configuration</h3>
          <InputField type='text' label='Access code' id='_configCode' value={_formValues._configCode} onChange={handleChange} placeholder='xxx-xxx' />
          {_formValues._configCode === process.env.NEXT_PUBLIC_CONFIG_CODE && 
            <Button 
              value={`Turn config mode ${_configEnabled ? 'off' : 'on'}`} 
              onClick={() => { setConfigEnabled(!_configEnabled)} } 
              extraClasses={`settings__button settings__configuration__button ${_configEnabled && 'active'}`} 
            />
          }
        </div>
        <div className='settings__active-config settings__block'>
          <h3>Active configuration file</h3>
          <div className='settings__themes__buttons'>
            <Button 
              value='Config' 
              onClick={() => setActiveConfigFile('ConfigA')} 
              extraClasses={`settings__button ${_activeConfigFile == 'ConfigA' && 'active'} `} 
            />
            <Button 
              value='Example Config' 
              onClick={() => setActiveConfigFile('ConfigB')} 
              extraClasses={`settings__button ${_activeConfigFile == 'ConfigB' && 'active'} `} 
            />
          </div>
        </div>
        <div className='settings__others settings__block'>
          <h3>Other settings</h3>
          <p>Coming soon...</p>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;