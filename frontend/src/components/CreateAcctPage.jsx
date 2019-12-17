import React from 'react';
import PropTypes from 'prop-types';

function CreateAcctPage(props) {

  let _username = null;
  let _password = null;

  function handleCreateAcct(event) {
    event.preventDefault();
    props.onCreateAcct({ Username: _username.value, Password: _password.value });
    _username = '';
    _password = '';
  }

  var btnParent = {
    textAlign: 'center',
    marginTop: '20px'
  };
  var btnStyle = {
    backgroundColor: '#747d5e',
    padding: '10px'
  };

  return (
    <div>
      <form onSubmit={handleCreateAcct}>
        <div style={btnParent}>
          <input
            type='text'
            placeholder='User ID'
            ref={(input) => { _username = input; }}
          />
        </div>
        <div style={btnParent}>
          <input
            type='password'
            placeholder='Password'
            ref={(input) => { _password = input; }}
          />
        </div>
        <div style={btnParent}>
          <button type='submit' style={btnStyle}>Create Account</button>
        </div>
      </form>
    </div>
  );
}

CreateAcctPage.propTypes = {
  onCreateAcct: PropTypes.func
};

export default CreateAcctPage;
