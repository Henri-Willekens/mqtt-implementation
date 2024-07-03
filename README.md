
# EVAP/SDI GUI

Dit project is de grafische gebruikersinterface voor het EVAP/SDI-platform. Het is een webinterface, gebouwd in React, die elementen zoals een kompas weergeeft. De use-case is voor de maritieme sector om aan boord te gebruiken om scheepsgegevens in te zien en monitoren.

## Demo

Insert gif or link to demo


## Lokaal draaiend krijgen

Clone het project

```bash
  git clone https://github.com/TzunderWulf/evap-sdi-gui.git
```

Ga naar de projectmap

```bash
  cd evap-sdi-gui
```

Installeer de dependecies

```bash
  npm install
```

Start de server

```bash
  npm run start
```


## Runnen van tests

Voer het volgende commando uit om tests uit te voeren

```bash
  npm run test
```


## Beschikbare elementen

Dit zijn alle elementen die tot nu toe zijn ingebouwd:

- Compass
- Rudder
- Barmeter
- HeatCoolingPump

## Confugiratie

Om te configureren welke elementen op dat moment zichtbaar zijn en welke specificaties (props) ze hebben, is documentatie geschreven voor de configurator.

[Documentation](https://linktodocumentation)

## Opzet van nieuwe elementen

Voor nieuwe elementen wordt de volgende mappenstructuur aangehouden (ter voorbeeld is er ook het dummy component in _src/components/molecules/Dummy_)

|-- ElementName
|  |-- ElementName.tsx (react code voor het element)
|  |-- ElementName.types.ts (het interface van het element)
|  |-- ElementName.scss (de styling van het element)

Als het element vanuit het configuratiebestand moet worden opgezet is het volgende nog van belang. Voeg het element toe aan _src/components/index.ts_ op de volgende manier:

```
const componentMap: { [key: string]: React.FC<any> } = {
  Compass,
  BarMeter,
  Rudder,
  ElementName
};
```

Voeg het element ook toe aan het configuratie document met de props die het element kan doorkrijgen. 

## Auteurs

Eerdere studenten die aan het project hebben gewerkt staan hier vermeld voor het geval er contact nodig is.

- [@TzunderWulf](https://www.github.com/tzunderwulf)
- [@Dancingkoalaa](https://www.github.com/Dancingkoalaa)


## Licentie

[MIT](https://choosealicense.com/licenses/mit/)

