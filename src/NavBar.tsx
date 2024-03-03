import "./styles/NavBar.css"

import { NavLink } from 'react-router-dom'

const NavBar = () => {


  return (
    <nav className='nav-bar'>
        <ul>
            <li>
                <NavLink to="/">მთავარი</NavLink>
            </li>
            <li>
                <NavLink to="/history">ისტორია</NavLink>
            </li>
        </ul>
    </nav>
  )
}

export default NavBar