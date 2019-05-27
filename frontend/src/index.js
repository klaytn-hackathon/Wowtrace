
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './stylesheet/style/styles.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import history from './utils/history';
import configureStore from './configureStore';

// Create redux store with history
const initialState = {};
const store = configureStore(initialState, history);

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>
, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
