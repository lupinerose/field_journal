
import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import logo from './BioFieldLogo.png';

function Navbar(props) {

  function clickLogout() {
    props.onLogout();
  }

  let signInOut = <Link to='/sign-in'>Sign In</Link>;

  if (props.currentUser) {
    signInOut = <Link onClick={clickLogout} to='/login'>Sign Out</Link>;
  }

  var navStyle = {
    backgroundColor: '#747d5e',
    backgroundImage: 'url(' + 'https://www.transparenttextures.com/patterns/tree-bark.png' + ')',
    padding: '20px',
    marginLeft: '1%',
    marginRight: '1%',
    borderRadius: '10px'
  };
  var marginLeftStyle = {
    marginLeft: '25px',
    float: 'left',
    color: 'black',
    fontFamily: 'Homemade Apple, cursive',
    fontSize: '50px',
    paddingTop: '20px',
    textDecoration: 'none'
  };
  var floatingRight = {
    textAlign: 'right',
    padding: '35px',
    textDecoration: 'none',
    color: 'black'
  };
  var logostyle = {
    float: 'left'
  };
  return (
    <nav style={navStyle}>
      <div className='nav-wrapper'>
        <img src={logo} style={logostyle} />
        <h1><Link to='/' className='brand-logo' style={marginLeftStyle}>BioField</Link></h1>
        <ul id='nav-mobile'>
          <div style={floatingRight}>
            <p>{signInOut} <Link style={floatingRight} to='/create-account'>Create Account</Link> <Link style={floatingRight} to='/create'>New Journal</Link></p>
          </div>
        </ul>
      </div>
    </nav>
  );
}

Navbar.propTypes = {
  onLogout: PropTypes.func,
  currentUser: PropTypes.number
};

export default Navbar;