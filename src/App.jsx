import Nav from './components/Nav'
import Footer from './components/Footer'

import { Outlet } from 'react-router-dom'

function App() {
  return (
    <div id="app-page">
      <Nav />
      <div id="main">
        <Outlet />
      </div>
      <Footer />
    </div>
  )
}

export default App
