import React from 'react';
import { Characters, Header } from 'components';
import './App.css';

function App() {
  return (
    <div className="App">
      <Header title={'Hooks'} />
      <Characters />
    </div>
  );
}

export default App;
