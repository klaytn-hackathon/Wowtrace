import React, { Component } from 'react';

class ProgressBar extends Component {
    render() {
        return (
            <div style={{
                textAlign: "center",
            }}>
                <img
                    src={require('../assets/images/loading_bar_green.gif')}
                    style={{
                        marginTop: "10px",
                        height: "25px"
                    }}
                ></img>
            </div>
        );
    }
}

export default ProgressBar;
