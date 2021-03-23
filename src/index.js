// External imports
import React from 'react';
import ReactDOM from 'react-dom';
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'

// Local imports
import App from './App';
import rootReducer from './slices/flight';

// Assets
import './index.css';

const store = configureStore({ reducer: rootReducer })

ReactDOM.render(
  <React.StrictMode >
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

