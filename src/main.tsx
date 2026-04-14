import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import WeatherProvider from './context/WeatherContext.tsx'
import ForecastProvider from './context/ForecastContext.tsx'
import Footer from './components/layout/footer.tsx'
import Header from './components/layout/header.tsx'
import App from './App.tsx'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <WeatherProvider>
      <ForecastProvider>
        <div className="flex flex-col min-h-screen bg-weather-slate-950">
          <Header />
          <main className="flex flex-1 justify-center">
            <App />
          </main>
          <Footer />
        </div>
      </ForecastProvider>
    </WeatherProvider>
  </StrictMode>
)
