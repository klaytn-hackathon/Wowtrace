import React, { Component } from 'react';

class Popup_PrivateKey extends Component {
  constructor(props) {
    super(props);
    this.state = {
      privateKey: null
    }
  }

  handlePrivateKey(e) {
    e.preventDefault();
    if (this.state.privateKey) localStorage.setItem('private', this.state.privateKey)
    this.props.handleSubmit()
  }

  handleClose(e) {
    if (e.target.id === "privatePopup") {
      this.props.handleHidePrivateKey()
    }
  }

  render() {
    return (
      <div className='popup_wra' id="privatePopup" onClick={(e) => this.handleClose(e)} >
        <form className='form popup_wra--form'
          onSubmit={(e) => {
            this.handlePrivateKey(e)
          }}
        >
          <div className='icon_header'></div>
          <label>Enter Private Key</label>
          <input className='txtPrivateKey' placeholder='Enter private key..' type='password'
            onChange={(e) => {
              this.setState({ privateKey: e.target.value })
            }} />
          <div className='popup_wra--footer'>
            <button type='submit'>Confirm</button>
          </div>
        </form>
      </ div>
    );
  }
}

export default Popup_PrivateKey;
