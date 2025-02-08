// React imports
import React, { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
// Font imports
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
// MUI component imports
import { ThemeProvider, CssBaseline } from '@mui/material/'
// Internal style imports
import AppTheme from './styles/AppTheme.jsx'
// Internal component imports
import HeaderBar from './components/HeaderBar.jsx'
import FooterBar from './components/FooterBar.jsx'
// Internal route imports
import HomePage from './pages/HomePage.jsx'
import ScoresPage from './pages/ScoresPage.jsx'
import ResultsPage from './pages/ResultsPage.jsx'
import ErrorPage from './pages/ErrorPage.jsx'
// Internal service imports
import { initializeAuthentication } from './services/AuthService.jsx'

export default function App() {

  // User state
  const [user, setUser] = useState(null)

  // Anonymous authentication
  useEffect(() => {
    const unsubscribe = initializeAuthentication(setUser)
    return () => {
      if (unsubscribe) unsubscribe()
    }
  }, [])

  return (
    <>
      <ThemeProvider theme={AppTheme}>
        <CssBaseline />
        <BrowserRouter>
          <HeaderBar />
          <Routes>
            <Route path='/7-wonders-scoreboard/' element={<HomePage />} />
            <Route path='/7-wonders-scoreboard/scores' element={<ScoresPage />} />
            <Route path='/7-wonders-scoreboard/results' element={<ResultsPage />} />
            <Route path='*' element={<ErrorPage />} />
          </Routes>
          <FooterBar />
        </BrowserRouter>
      </ThemeProvider>
    </>
  )
}
