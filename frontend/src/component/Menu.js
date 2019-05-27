import React, { Component } from 'react';
import { Link } from 'react-router-dom'

class Menu extends Component {
  render() {
    return (
      <nav>
        <h1>
          <img src={require('../assets/images/logo.png')} className='logo' />
        </h1>
        <ul>
          <li><Link to='/owner'>Owner</Link></li>
          <li><Link to='/producer'>Producer</Link></li>
          <li><Link to='#'>My Account</Link></li>
          <li>
            <Link
              to='/'
              onClick={() => {
                localStorage.clear()
              }}
            >
              Logout
            </Link>
          </li>
        </ul>
      </nav>
    );
  }
}

export default Menu;
