import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

//import Main from './pages/Main/Main'
//import Auth from './pages/Auth/Auth'
//import Search from './pages/Search/Search'
import Results from './pages/Results/Results'

import './common.css'

createRoot(document.getElementById('app-root')).render(
  <StrictMode>
    <Results />
  </StrictMode>,
)
