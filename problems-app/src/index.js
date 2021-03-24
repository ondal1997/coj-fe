import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const style = {
  fontSize: '20px',
};

ReactDOM.render(
  <React.StrictMode>
    <App style={{fontSize: '20px'}}/>
  </React.StrictMode>,
  document.getElementById('root'),
);

reportWebVitals();
