import React from 'react';
import ReactDOM from 'react-dom';
// import "react-datepicker/dist/react-datepicker.css";
// import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.scss';
import Routes from './Routes';

ReactDOM.render(
  <React.StrictMode>
    <Routes />
  </React.StrictMode>,
  document.getElementById('root')
);