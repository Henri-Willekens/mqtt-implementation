import { useEffect } from "react";

import "./App.scss";
import Header from "./components/molecules/Header/Header";

import config from "./config.json";

const App = () => {
  return(
    <div className="app">
      <div className="main">
        <Header pages={['page1', 'page2']} />
        <div className="components"></div>
      </div>
    </div>
  );
};

export default App;