import React from 'react';
import ReactDOM from 'react-dom';
import { Provider, useSelector } from 'react-redux'
import store from './store'
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './bootstrap.min.css'
import axios from 'axios'


axios.defaults.baseURL = 'http://127.0.0.1:8000/'


ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
