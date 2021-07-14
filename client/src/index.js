import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import reducer from './reducers';
import './index.css';
// import 'bootstrap/dist/css/bootstrap.min.css';
import * as serviceWorker from './serviceWorker';

const store = createStore(reducer, compose(applyMiddleware(thunk)));
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
serviceWorker.register();
