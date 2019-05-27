import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Menu, Owner, Producer, Login, Loading } from './component';
import { ToastContainer } from 'react-toastify';
// import { connect } from 'react-redux'

import 'react-toastify/dist/ReactToastify.css';


class App extends Component {
  render() {
    return (
      <div className='wrapper'>
        <Loading />
        {/* {this.props.isShow && (<div className="loading" >
          <div className="loader" />
        </div>)} */}
        <ToastContainer></ToastContainer>
        <Router>
          <div>
            <Route exact path="/" component={() => (
              <div className='loginForm'>
                <Login />
              </div>
            )} />

            <Route path="/producer" component={() => (
              <div className='container'>
                <aside><Menu /></aside>
                <article>
                  <Producer />
                </article>
              </div>
            )} />

            <Route path="/owner" component={() => (
              <div className='container'>
                <aside><Menu /></aside>
                <article>
                  <Owner />
                </article>
              </div>
            )} />
          </div>
        </Router>
      </div>
    );
  }
}

// const mapStateToProps = (state /*, ownProps*/) => {
//   return {
//     isShow: state.owner.get('isShow')
//   }
// }

export default App;
