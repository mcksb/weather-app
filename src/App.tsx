import GraphCard from './components/weather/GraphCard';
import ForecastStrip from './components/weather/ForecastStrip';
import CurrentConditions from './components/weather/CurrentConditions';
import './App.css';

function App() {

  return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 max-w-[80%]">
        <div className="col-span-1 h-full order-1">
          <CurrentConditions />
        </div>
        <div className="col-span-1 md:col-span-2 h-full order-3 md:order-2">
          <GraphCard />
        </div>
        <div className="col-span-1 md:col-span-3 self-start order-2 md:order-3">
          <ForecastStrip />
        </div>
      </div>
  )
}

export default App
