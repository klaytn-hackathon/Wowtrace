import React, { Component } from 'react';
import { connect } from 'react-redux'

import 'react-toastify/dist/ReactToastify.css';


class Loading extends Component {
  render() {
    return (
      <div>
        {this.props.isShow && (<div className="loading" >
          <div className="loader" />
        </div>)}
      </div>
    );
  }
}

const mapStateToProps = (state /*, ownProps*/) => {
  return {
    isShow: state.owner.get('isShow')
  }
}

export default connect(mapStateToProps, null)(Loading);
