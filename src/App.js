import './App.css';
import Compass from './components/Compass';
import BarMeter from './components/BarMeter';

function App() {
  return (
    <div className="App">
      <Compass />
      <BarMeter value={340} className="pro-2"/>
      <BarMeter value={560} className="pro-1" />
    </div>
  );
}

export default App;
