import Nav from './components/Nav'
import Footer from './components/Footer'

import { Outlet } from 'react-router-dom'

import background from './assets/images/background.png'
import backgroundMobile from './assets/images/background-mobile.png'

function App() {
  return (
    <div id="app-page">
      <Nav />
      <div id="main" style={{ backgroundImage: `url(${window.innerWidth > 600 ? background : backgroundMobile})` }}>
        <Outlet />
      </div>
      <Footer />
    </div>
  )
}

export default App
