import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import WeatherProvider from './context/WeatherContext.tsx'
import Footer from './components/layout/footer.tsx'
import Header from './components/layout/header.tsx'
import App from './App.tsx'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <WeatherProvider>
      <Header />
      <App />
      <Footer />
    </WeatherProvider>
  </StrictMode>
)
