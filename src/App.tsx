import HeroCard from './components/weather/HeroCard';
import GraphCard from './components/weather/GraphCard';
import WindCard from './components/weather/WindCard';
import AtmosphereCard from './components/weather/AtmosphereCard';
import ForecastStrip from './components/weather/ForecastStrip';
import CurrentConditions from './components/weather/CurrentConditions';
import './App.css';

function App() {

  return (
    <div className="flex justify-center grow">
      <div className="grid grid-cols-12 grid-rows-10 p-4 gap-4 h-fit">
        {/* Hero Card */}
        <div className="col-span-4 row-span-7">
          {/* <HeroCard /> */}
          <CurrentConditions />
        </div>
        <div className="col-span-8 row-span-7">
          <div className="flex justify-between text-[14px] border border-white rounded-xl w-full h-full p-4">
            <p>Hourly metrics</p>
            <p>{new Date().toLocaleDateString('en-US')}</p>
          </div>
        </div>
        <div className="col-span-12 row-span-3">
          <div className="flex justify-between text-[14px] border border-white rounded-xl w-full h-full p-4">
            Daily forecast
          </div>
        </div>
        {/* Graph Card
        <div>
          <GraphCard />
        </div>        
        Wind Card
        <div>
          <WindCard />
        </div>
        Atmosphere Card
        <div>
          <AtmosphereCard />
        </div>
        Forecast Strip
        <div>
          <ForecastStrip />
        </div> */}
      </div>
    </div>
  )
}

export default App
