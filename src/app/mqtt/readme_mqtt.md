1. Start eerst de backend server met:
    $ cd evap-sdi-gui/src/app/mqtt
    $ node mqtt_config.js

2. Daarna de front end opstarten in een andere terminal
   $ npm run start

3. output op de inspect element in de front end http://10.0.0.15:3000/
        Firefox can’t establish a connection to the server at ws://10.0.0.15:5000/. 
        The connection to ws://10.0.0.15:5000/ was interrupted while the page was loading.
        WebSocket error: error {  … }
        WebSocket connection closed 
        WebSocket connection established

_____________________________________________________________________________________

Om de mqtt te testen heb ik een test_publishmqtt.py geschreven

test python scripts:
    https://www.emqx.com/en/blog/how-to-use-mqtt-in-python

1.    $ python3 --version             
        Python 3.11.8

2.    $ pip3 install paho-mqtt


# Run de test script
3.    $ python3 test_publishmqtt.py
_________________________________________________________________________________________

output van:
1.      $ python3 test_publishmqtt.py
            Connected to MQTT Broker!
            Send `messages: 1` to topic `ship/light`
            Send `messages: 2` to topic `ship/light`
            Send `messages: 3` to topic `ship/light`
            Send `messages: 4` to topic `ship/light`
            Send `messages: 5` to topic `ship/light`
2.      $ node mqtt_config.js

            Server is running on port 5000
            Connected to MQTT broker
            WebSocket connection established

3.      output op de inspect element in de front end http://10.0.0.15:3000/
            WebSocket connection closed App.tsx:45:14
            WebSocket connection established App.tsx:35:14
            Received message: 
            Object { topic: "ship/light/1", message: "messages: 1" }
            App.tsx:40:14
            Received message: 
            Object { topic: "ship/stuur", message: "off" }
            App.tsx:40:14
            Received message: 
            Object { topic: "ship/light/1", message: "messages: 2" }
            App.tsx:40:14
            Received message: 
            Object { topic: "ship/stuur", message: "off" }
            App.tsx:40:14
            Received message: 
            Object { topic: "ship/light/1", message: "messages: 3" }
            App.tsx:40:14
            Received message: 
            Object { topic: "ship/stuur", message: "off" }
            App.tsx:40:14
            Received message: 
            Object { topic: "ship/light/1", message: "messages: 4" }