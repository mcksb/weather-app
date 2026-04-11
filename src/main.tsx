import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Footer from './components/layout/footer.tsx'
import Header from './components/layout/header.tsx'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Header />
    <App />
    <Footer />
  </StrictMode>
)
