import './SettingsPage.scss';

import { useState, useContext, useEffect } from 'react';

import Button from '../../../atoms/Button/Button';
import InputField from 'src/app/components/atoms/FormInputs/InputField/InputField';

import useFormInput from 'src/app/hooks/useFormInput';
import { CurrentThemeContext } from 'src/app/contexts/CurrentTheme';
import { ActiveConfigFileContext } from 'src/app/contexts/ActiveConfigFile';
import { ConfigEnabledContext } from 'src/app/contexts/ConfigEnabled';

import config from '../../../../configuration/config.json';

const SettingsPage: React.FC = () => {
  const [initialValues, setInitialValues] = useState({
    configCode: '',
  });

  const { formValues, handleChange } = useFormInput(initialValues);

  const { _currentTheme, setCurrentTheme } = useContext(CurrentThemeContext);
  const { _activeConfigFile, setActiveConfigFile } = useContext(ActiveConfigFileContext);
  const { _configEnabled, setConfigEnabled } = useContext(ConfigEnabledContext);

  const [websocketUrl, setWebsocketUrl] = useState(config.websocketUrl || '');
  const [apiUrl, setApiUrl] = useState(config.apiUrl || '');
  const [mqttUrl, setMqttUrl] = useState(config.mqttUrl || '');
  const [mqttUsername, setMqttUsername] = useState(config.mqttUsername || '');
  const [mqttPassword, setMqttpassword] = useState(config.mqttPassword || '');
  const [initializeMqttTopic, setInitializeMqttTopic] = useState(config.initializeMqttTopic || '');


  useEffect(() => {
    if (sessionStorage.getItem('configCode') === null) {
      return;
    };

    setInitialValues({
      configCode: sessionStorage.getItem('configCode') as string
    }
  );
  }, []);

  useEffect(() => {
    if (formValues.configCode === process.env.NEXT_PUBLIC_CONFIG_CODE) {
      sessionStorage.setItem('configCode', formValues.configCode);
    } else if (formValues.configCode != process.env.NEXT_PUBLIC_CONFIG_CODE && sessionStorage.getItem('configCode') != null) {
      sessionStorage.removeItem('configCode');
    };
  }, [formValues.configCode]);

  function openWikiPage(elementId) {
    const url = "config_page.html?element=" + elementId;
    //const url = "https://support.microsoft.com/nl-nl/topic/beschrijving-van-de-tekst-lorem-ipsum-dolor-sit-amet-in-de-help-van-word-bf3b0a9e-8f6b-c2ab-edd9-41c1f9aa2ea0";
    window.open(url, "_blank", "width=800,height=600");
  }

  const handleWebsocketChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWebsocketUrl(e.target.value);
  };

  const handleApiUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setApiUrl(e.target.value);
  };

  const handleMqttUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMqttUrl(e.target.value);
  };

  const handleMqttUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMqttUsername(e.target.value);
  };

  const handleMqttPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMqttpassword(e.target.value);
  };

  const handleInitializeMqttTopicChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInitializeMqttTopic(e.target.value);
  };



  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    const updatedConfig = { websocketUrl, apiUrl, mqttUrl, mqttUsername, mqttPassword, initializeMqttTopic };
  
    try {
      const response = await fetch('/api/write-json', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedConfig),
      });
      const data = await response.json();
      console.log('ip-address:', data);
    } catch (error) {
      console.error('Error changing:', error);
    }
  };
  

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
          <InputField type='text' label='Access code' id='configCode' value={formValues.configCode} onChange={handleChange} placeholder='xxx-xxx' />
          {formValues.configCode === process.env.NEXT_PUBLIC_CONFIG_CODE && 
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
          {_configEnabled && <Button 
          value='Open Wiki page' 
          onClick={() => openWikiPage('Element456')} />}
        </div><form onSubmit={handleSubmit}>
  {_configEnabled && (
    <>
      <div>
        <h3>MQTT connection</h3>
        <label htmlFor="websocketUrl">WebSocket URL: </label>
        <input
          type="text"
          id="websocketUrl"
          value={websocketUrl}
          onChange={handleWebsocketChange}
          placeholder="ws://localhost:5000/"
          style={{ width: '300px' }}
        />
      </div>

      <div>
        <label htmlFor="apiUrl">API URL: </label>
        <input
          type="text"
          id="apiUrl"
          value={apiUrl}
          onChange={handleApiUrlChange}
          placeholder="http://localhost:5000/api/topics"
          style={{ width: '300px' }}
        />
      </div>

      <div style={{ marginTop: '10px' }}>
        <label htmlFor="mqttUrl">MQTT URL: </label>
        <input
          type="text"
          id="mqttUrl"
          value={mqttUrl}
          onChange={handleMqttUrlChange}
          placeholder="mqtt://aquabots.tech:1883"
          style={{ width: '300px' }}
        />
      </div>

      <div>
        <label htmlFor="initializeMqttTopic">Set MQTT topic: </label>
        <input
          type="text"
          id="initializeMqttTopic"
          value={initializeMqttTopic}
          onChange={handleInitializeMqttTopicChange}
          placeholder="#"
          style={{ width: '300px' }}
        />
      </div>
    </>
  )}

  <div>
    <label htmlFor="mqttUsername">MQTT Username: </label>
    <input
      type="text"
      id="mqttUsername"
      value={mqttUsername}
      onChange={handleMqttUsernameChange}
      placeholder="jan"
      style={{ width: '300px' }}
    />
  </div>

  <div style={{ marginBottom: '10px' }}>
    <label htmlFor="mqttPassword">MQTT Password: </label>
    <input
      type="password"
      id="mqttPassword"
      value={mqttPassword}
      onChange={handleMqttPasswordChange}
      placeholder="welkom01"
      style={{ width: '300px' }}
    />
  </div>

  <button type="submit">Update MQTT Config</button>
  <div className="settings__others settings__block"></div>
</form>


    </div>
      </div>
  );
};

export default SettingsPage;