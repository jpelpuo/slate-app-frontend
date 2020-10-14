import React from 'react';
import Router from './router';
import { history } from './store'
import './App.css';

function App() {
  return (
    <div className="App">
      <Router history={history} />
    </div>
  );
}

export default App;
