import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { initializeApp } from 'firebase/app';

import App from './App';
import './styles/index.css';

const firebaseConfig = {
  apiKey: 'AIzaSyDFpQLDUE20a7kRt8Ips5LTkI2vjo9WYM4',
  authDomain: 'sharedlist-d718d.firebaseapp.com',
  projectId: 'sharedlist-d718d',
  storageBucket: 'sharedlist-d718d.appspot.com',
  messagingSenderId: '529035927136',
  appId: '1:529035927136:web:d2653ac9078f8c80e9ad05',
};

initializeApp(firebaseConfig);

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>,
  document.getElementById('root'),
);
