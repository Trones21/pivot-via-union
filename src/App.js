import React from 'react';
import logo from './logo.svg';
import './App.css';
import { MainGif } from './components/MainGif';
import { TableForm } from './components/TableForm';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h3>unPivot Via Union</h3>
        <MainGif />
      </header>
      <TableForm />

    </div>
  );
}

export default App;
