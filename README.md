
# EVAP/SDI GUI

This project is a GUI webinterface for the EVAP/SDI project. The webinterface is built in React using TypeScript and Next. Next is used for back-end purposes, such as updating the config.json. Configuration is done via config.json within the folder /configuration. The data from the ship is send via an MQTT broker.

Use-case of this GUI is to monitor ship data (heading, motor temperature, etc).


## Demo

Insert gif or link to demo
![](https://github.com/TzunderWulf/evap-sdi-gui/2024-10-1512-05-55-ezgif.com-resize.gif)
![](https://github.com/TzunderWulf/evap-sdi-gui/2024-10-1512-06-52-ezgif.com-video-to-gif-converter.gif)


## Run Locally

Clone the project

```bash
    git clone https://github.com/TzunderWulf/evap-sdi-gui.git
```

Go to the project directory

```bash
  cd evap-sdi-gui
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run start
```


## Available elements

- Compass
- Rudder angle indicator
- Bar gauge
- Value field
- Valve
- Pump
- Pipes and connection lines



## Setup future elements

To create new elements in the future:

There are three files available for each element:
- Element.tsx (contains the React code)
- Element.types.ts (contains the interface, what props does it have)
- Element.scss (styling related code)

React components use PascalCase for naming, so BarGauge or ValueField. The rest of the variables use camelCase, so isEditable or isModalOpen. Local variables within components start with an underscore (ex. _width) to differenate them from props, in case they require the same name. Function names, both local and not, just use normal camelCase. So for an example element:

```
const ElementName: React.FC = ({
    isEditable = false,
    isModalOpen = false
}) => {
    const _isModalOpen = true;
    let _isEditable = true;

    const changeEditable = (_changedValue: string) => {
        _isEditable = _changedValue;
    };
};

export default ElementName;
```

To make sure components are picked up by the config.json, they require to be added to components/index.ts. Import the new element and add them to componentMap. This also adds them to the library so that you can add your new element to the config.json via the GUI (while in configurator mode).
## Documentation

There are two types of documentation available. Designer documentation is available within this README. Configurator related documentation is available [here](https://linktodocumentation).


## Authors

Previous students that have worked on the project are listed here in case contact is needed.

- [@TzunderWulf](https://www.github.com/tzunderwulf)
- [@Dancingkoalaa](https://www.github.com/Dancingkoalaa)


## License

[MIT](https://choosealicense.com/licenses/mit/)

