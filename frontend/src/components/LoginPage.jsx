import React from 'react';
import PropTypes from 'prop-types';

function LoginPage(props) {

  let _username = null;
  let _password = null;

  function handleLogin(event) {
    event.preventDefault();
    props.onLogin({ Username: _username.value, Password: _password.value });
    _username = '';
    _password = '';
  }

  var loginBtnParent = {
    textAlign: 'center',
    marginTop: '20px'
  };
  var loginBtnStyle = {
    backgroundColor: '#747d5e',
    padding: '10px'
  };

  return (
    <div>
      <form onSubmit={handleLogin}>
        <style jsx>{`
            .input-field input:focus {
              border-bottom: 1px solid #0f2c3e;
              box-shadow: 0 1px 0 0 #0f2c3e;
            }
        `}</style>
        <div style={loginBtnParent} className='input-field'>
          <input
            type='text'
            placeholder='User ID'
            ref={(input) => { _username = input; }}
          />
        </div>
        <div style={loginBtnParent} className='input-field'>
          <input
            type='password'
            placeholder='Password'
            ref={(input) => { _password = input; }}
          />
        </div>
        <div style={loginBtnParent}>
          <button type='submit' style={loginBtnStyle} className='waves-effect waves-light btn-large'>Log in</button>
        </div>
      </form>
    </div>
  );
}

LoginPage.propTypes = {
  onLogin: PropTypes.func
};

export default LoginPage;