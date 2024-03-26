import './styles.css'

import logo from '../../assets/images/logo-2.png'
import areaKids from '../../assets/images/area-kids.png'
import { Link } from 'react-router-dom'

function Nav() {
  return (
    <nav>
      <Link to="/Home"><img id="logo" className="logo" alt="logo" src={logo} /></Link>

      <div id="nav-menu">
        <ul>
          <li><Link to="/Instituto">Instituto</Link></li>
          <li><Link to="/Exames">Exames</Link></li>
          <li>
            <Link to="/AreaKids"><img id="area-kids" alt="área kids" src={areaKids} /></Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Nav