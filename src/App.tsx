import HeroCard from './components/weather/HeroCard';
import GraphCard from './components/weather/GraphCard';
import WindCard from './components/weather/WindCard';
import AtmosphereCard from './components/weather/AtmosphereCard';
import ForecastStrip from './components/weather/ForecastStrip';
import './App.css';

function App() {

  return (
    <>
      <section className="flex gap-4 grow p-4">
        {/* Hero Card */}
        <div className="">
          <HeroCard />
        </div>
        {/* Graph Card */}
        <div className="border border-white rounded-xl p-4">
          <GraphCard />
        </div>        
        {/* Wind Card */}
        <div className="border border-white rounded-xl p-4">
          <WindCard />
        </div>
        {/* Atmosphere Card */}
        <div className="border border-white rounded-xl p-4">
          <AtmosphereCard />
        </div>
        {/* Forecast Strip */}
        <div className="border border-white rounded-xl p-4">
          <ForecastStrip />
        </div>
      </section>
    </>
  )
}

export default App
