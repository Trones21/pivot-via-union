import React from 'react';
import './App.css';
import { MainGif } from './components/MainGif';
import { TableFormList } from './components/TableFormList';

function App() {

  return (
    <div className="App">
      <header className="App-header">
        <h3>unPivot Via Union</h3>
        <MainGif />
      </header>
      <div className="App-main">
        <TableFormList />
      </div>
    </div>

  );
}

export default App;
