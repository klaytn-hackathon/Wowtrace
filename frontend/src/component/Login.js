import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
const rp = require('request-promise');
const myConfig = require('../utils/config.json')

class Login extends Component {
  state = {
    username: '',
    password: ''
  }
  handleLogin(event) {
    event.preventDefault();
    const { username, password } = this.state
    const self = this
    var options = {
      method: 'POST',
      uri: `${myConfig.BACKEND_API}/login`,
      body: {
        username,
        password
      },
      json: true // Automatically stringifies the body to JSON
    };
    rp(options)
      .then(function (parsedBody) {
        localStorage.setItem('token', parsedBody.data.token)
        self.props.history.push('/owner')
      })
      .catch(function (err) {
        console.log(err)
      });
  }

  render() {
    return (
      <div className='login'>
        <h1>
          <img src={require('../assets/images/login.png')} className='logo' />
        </h1>
        <form className='form' onSubmit={(event) => {
          this.handleLogin(event)
        }}>
          <label>Username</label>
          <input
            type='text'
            className='txt'
            placeholder='Enter username'
            onChange={(e) => {
              this.setState({ username: e.target.value })
            }} />
          <label>Password</label>
          <input
            type='password'
            className='txt'
            placeholder='Enter password'
            onChange={(e) => {
              this.setState({ password: e.target.value })
            }} />
          <button
            className='btnLogin'
            type='submit'
          >
            Login
            </button>
        </form>
      </div>
    );
  }
}

export default withRouter(Login);
