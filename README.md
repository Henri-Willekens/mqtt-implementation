
# EVAP/SDI GUI

This project is a GUI webinterface for the EVAP/SDI project. The webinterface is built in React using TypeScript and Next. Next is used for back-end purposes, such as updating the config.json. Configuration is done via config.json within the folder /configuration. The data from the ship is send via an MQTT broker.

Use-case of this GUI is to monitor ship data (heading, motor temperature, etc).


## Demo

<br /> Demo for GUI for an engineer <br />
![](https://github.com/TzunderWulf/evap-sdi-gui/blob/master/2024-10-1512-05-55-ezgif.com-resize.gif)
<br /> Demo for configuring a GUI for navigator <br />
![](https://github.com/TzunderWulf/evap-sdi-gui/blob/master/2024-10-1512-06-52-ezgif.com-video-to-gif-converter.gif)


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

### Required files

First step is to create a folder for the element (for ex. `/BarGauge`). The location of this is always in the `/components`  and then in either `/atoms` , `/molecules`  or `/organisms` . The location is dependent on the size and whether it’s build up using other elements. Atoms are small-scale elements, molecules exists out of several atoms and organisms exist out of several molecules and/or atoms (for understanding the Atomic Design Methodology: [Atomic Design Methodology | Atomic Design by Brad Frost](https://atomicdesign.bradfrost.com/chapter-2/)). The following files should be created in the folder (BarGauge is being used as an example here):

- `BarGauge.tsx` = contains the React code.
- `BarGauge.types.ts` = contains the interface, these are the expected props, such as height, width, maxValue, et cetera.
- `BarGauge.scss` = contains the styling in scss format (example of scss syntax: [Sass: Syntax](https://sass-lang.com/documentation/syntax/))

### Casings

Within this project we use different types of casings to improve readability. By using different types of casings for specific use-cases, you can immediately see what type of variable we are talking about. There are 4 types of casings being used:

- PascalCase
Used for naming React components, so ex. `BarGauge`, `Compass`, `SelectField`.
- camelCase
camelCase is used for all public variables and functions, so ex. `isEditable`, `maxValue`, `updateCurrentValue` .
- _camelCase
_camelCase is used for private variables, so ex. `_isEditable`, `_maxValue`.
- kebab-case
kebab-case is used for styling and scss, so ex. `compass-pointer`, `alarm-limit`.

### Styling

For styling, we used SCSS. This allows the creation of variables within CSS, allowing easy adjusting in terms of colors, effects, shadows, et cetera. These variables are stored in `app/styles/*.scss` . Within your own .scss files for styling elements, you can import these (examples can be found in the next chapter [The different types of files](#The-different-types-of-files)).

### Making components configurable

To make sure config.json can map a text to the correct elements, you need to add your element(s) to `./components/index.ts`. Adding them here also automatically adds them to the library within the configurator GUI.

```tsx
// Filename: ./components/index.ts

import Compass from './atoms/Compass/Compass';
import BarGauge from './atoms/BarGauge/BarGauge';
import Rudder from './atoms/Rudder/Rudder';
import Pump from './atoms/Pump/Pump';
import Valve from './atoms/Valve/Valve';
import ValueField from './atoms/ValueField/ValueField';
import ReferenceButton from './atoms/ReferenceButton/ReferenceButton';
import ExampleElement from './atomes/ExampleElement/ExampleElement'; // Change this to match your element name

const componentMap: { [key: string]: React.FC<any> } = {
  Compass,
  BarGauge,
  Rudder,
  Pump,
  Valve,
  ValueField,
  ReferenceButton,
  ExampleElement // Same over here, change this to match your element name
};

export default componentMap;
```

### The different types of files

As mentioned before there are 3 different files. Here are examples for these files. The names used are just examples and can be different. Make sure your element has a width and height, either a set one via scss or via config.json.

```tsx
// Filename: ./components/BarGauge/BarGauge.tsx

import BarGaugeProps from './BarGauge.types';
import './BarGauge.scss';

const BarGauge: React.FC<BarGaugeProps> = ({ 
	label = '', 
	maxValue = 0,
	width = 250,
	height = 250
}) => {
	const [_value, setValue] = useState(0);
	const [isModalOpen, setIsModalOpen] = useState(false);
	
	const openModal = () => setIsModalOpen(true);
	const closeModal = () => setIsModalOpen(false);
	
	const handleSubmit = () => {
		// Handle submit
		closeModal();
	};

	const calculatePercentage = (value: number) => {
		const percentage = (value / maxValue) * 100;
		return percentage;
	};
	
	return(
		<>
			<div style={`width:${width}px;height:${height}px;`} className='bar-gauge'>
				<p className='bar-gauge-text'>{_value} is {calculatePercentage()}% of {maxValue}</p>
				<Button value='Open modal' onClick={openModal} />
				<p>This code is the actual HTML of the element, so it can be different depending on what you are creating.</p>
			</div>
			<FormModal isOpen={isModalOpen} onSubmit={handleSubmit} onCancel={closeModal}>
				{ /* Place inputs here for the different types of props that need to be edited */ }
			</FormModal>
		</>
	)
};

export default BarGauge;
```

```jsx
// Filename: ./components/BarGauge/BarGauge.tsx

export default interface BarGaugeProps {
	label: string,
	maxValue: number,
	width: number,
	height: number
}
```

```scss
// Filename: ./components/BarGauge/BarGauge.scss

@import '../../../styles/colors';

.bar-gauge {
	color: $white;
	&-text {
		background-color: $black;
		color: $white;
	}
}
```

## Documentation

There are two types of documentation available. Designer documentation is available within this README: [Setup future elements](Setup-future-elements). Configurator related documentation is available [here](https://linktodocumentation).


## Authors

Previous students that have worked on the project are listed here in case contact is needed.

- [@TzunderWulf](https://www.github.com/tzunderwulf)
- [@Dancingkoalaa](https://www.github.com/Dancingkoalaa)


## License

[MIT](https://choosealicense.com/licenses/mit/)

