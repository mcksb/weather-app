import HeroCard from './components/weather/HeroCard';
import GraphCard from './components/weather/GraphCard';
import WindCard from './components/weather/WindCard';
import AtmosphereCard from './components/weather/AtmosphereCard';
import ForecastStrip from './components/weather/ForecastStrip';
import CurrentConditions from './components/weather/CurrentConditions';
import './App.css';

function App() {

  return (
      <section className="grid grid-cols-12 grid-rows-12 p-4 gap-4 grow">
        {/* Hero Card */}
        <div className="col-span-4 row-span-8">
          {/* <HeroCard /> */}
          <CurrentConditions />
        </div>
        <div className="col-span-8 row-span-8">
          <div className="border border-white rounded-xl h-full">

          </div>
        </div>
        <div className="col-span-12 row-span-4">
          <div className="border border-white rounded-xl h-full">

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
      </section>
  )
}

export default App
