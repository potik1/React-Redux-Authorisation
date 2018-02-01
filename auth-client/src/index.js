import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createStore, compose, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';


import App from './components/app';
import reducers from './reducers';
import {AUTH_USER} from './actions/types';

const store = createStore(
    reducers,
    compose(
        applyMiddleware(thunk),
        window.devToolsExtension ? window.devToolsExtension() : f => f,
    ),
);
const token = localStorage.getItem('token');
if (token) {
  store.dispatch({type:AUTH_USER});
}


ReactDOM.render(
      <Provider store={store}>
      <App/>
    </Provider>
    , document.querySelector('.container'));
