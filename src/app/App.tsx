import './App.scss';

import React, { useEffect, useState, useRef } from 'react';

import Header from './components/molecules/Header/Header';
import PageManager from './components/organisms/PageManager/PageManager';
import Library from './components/molecules/Library/Library';
import Compass from "./components/atoms/Compass/Compass"; 
import SendNumber from "./components/atoms/Heading/Autopilotinput";


import { ThemeContext } from './contexts/Theme';
import { ConfigEnabledContext } from './contexts/ConfigEnabled';
import { ConfigFileContext } from './contexts/ConfigFile';
import { Config } from './configuration/types';
import { ActivePageContext } from './contexts/ActivePage';

const App = () => {
  const [_configData, setConfigData] = useState<Config | null>(null);
  const [_currentTheme, setCurrentTheme] = useState('day');
  const [_configEnabled, setConfigEnabled] = useState(false);
  const [_activePageId, setActivePageId] = useState('Settings');
  const [_activeConfig, setActiveConfig] = useState('ConfigA');

  const fetchConfig = () => {
    const _fileToFetch = _activeConfig == 'ConfigA' ? 'config.json' : 'example.config.json';
    fetch(`/api/read-json?file=${_fileToFetch}`)
      .then((_res) => _res.json())
      .then((_results) => {
        setConfigData(_results);
      })
      .catch((_err) => console.error(_err));
  };

  const App = () => {
  const [mqttMessages, setMqttMessages] = useState<any[]>([]); // State for all MQTT messages
  const [mqttHeadingMessage, setMqttHeadingMessage] = useState<string | null>(null); // MQTT message for heading
  const [mqttCogMessage, setMqttCogMessage] = useState<string | null>(null); // MQTT message for COG
  const [mqttHeadingTopic, setMqttHeadingTopic] = useState("test/heading"); // Default heading topic
  const [mqttCogTopic, setMqttCogTopic] = useState("test/cog"); // Default COG topic
  const ws = useRef<WebSocket | null>(null); // Using ref to hold the WebSocket connection

  // Function to handle sending the number to the WebSocket/MQTT
  const handleSendNumber = (topic: string, number: number) => {
    if (ws.current && ws.current.readyState === WebSocket.OPEN) {
      const message = JSON.stringify({
        topic,
        message: number.toString(), // Send the number as a string
      });
      ws.current.send(message); // Send the message to the WebSocket server
    } else {
      console.error("WebSocket is not open. Unable to send message.");
    }
  };

  useEffect(() => {
       // Connect to the WebSocket server
    ws.current = new WebSocket("ws://localhost:4000"); // Update with your server address if different

    ws.current.onopen = () => {
      console.log("WebSocket connection established");
    };

    // Listen for messages from the WebSocket server
    ws.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      const { topic, message } = data;

      // Update MQTT messages state
      setMqttMessages((prevMessages) => [
        ...prevMessages,
        { topic, message },
      ]);

      // Update specific messages
      if (topic === mqttHeadingTopic) {
        setMqttHeadingMessage(message);
      } else if (topic === mqttCogTopic) {
        setMqttCogMessage(message);
      }
    };

    ws.current.onclose = () => {
      console.log("WebSocket connection closed");
    };

    // Cleanup function to close WebSocket connection when component unmounts
    return () => {
      ws.current?.close();
    };
  }, [mqttHeadingTopic, mqttCogTopic]); // Run effect on topic change

  // Handle changing the heading topic
  const handleHeadingTopicChange = (newTopic: string) => {
    setMqttHeadingTopic(newTopic); // Update heading topic state
  };

  // Handle changing the COG topic
  const handleCogTopicChange = (newTopic: string) => {
    setMqttCogTopic(newTopic); // Update COG topic state

    fetchConfig();
    console.log(_configData)
  }, [_activeConfig]);

  return (
    <div className='app'>
      <ThemeContext.Provider value={{ _currentTheme, setCurrentTheme }}>
        <div className={`filter filter__${_currentTheme}`}>
          <ConfigEnabledContext.Provider value={{ _configEnabled, setConfigEnabled }}>
            <div className={_configEnabled ? 'main main-config-mode' : 'main'}>
              {_configData === null ? (
                <div className='loading'>
                  <div className='loader'></div>
                  <p>Loading...</p>
                </div>
              ) : (
                <>
                  <ActivePageContext.Provider value={{_activePageId, setActivePageId}}>
                    <Header configData={_configData} pages={_configData.pages} />
                    <div className='components'>
                      <ConfigFileContext.Provider value={{ _activeConfig, setActiveConfig }}>
                        <PageManager config={_configData} activePageId={_activePageId} />
                      </ConfigFileContext.Provider>
                    </div>
                    {_configEnabled && <Library activePageId={_activePageId} config={_configData} />}
                  </ActivePageContext.Provider>
                </>
              )}
            </div>
          </ConfigEnabledContext.Provider>
        </div>
      </ThemeContext.Provider>
    </div>
        <div>
      {/* Pass both MQTT messages and handleTopicChange to Compass */}
      <Compass
        mqttHeadingMessage={mqttHeadingMessage}
        mqttCogMessage={mqttCogMessage}
        onHeadingTopicChange={handleHeadingTopicChange}
        onCogTopicChange={handleCogTopicChange}
      />
      <div>
        <h1>Send a Number to an MQTT Topic</h1>
        <SendNumber onSendNumber={handleSendNumber} />
      </div>
    </div>
  );
};

export default App;

