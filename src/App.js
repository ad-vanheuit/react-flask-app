import logo from './logo.svg';
import kip from './mudkipsip.png'
import React, { useState, useEffect } from 'react';
import './App.css';
import { AgGridReact } from 'ag-grid-react'; // React Data Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the Data Grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the Data Grid

function App() {
  const [currentTime, setCurrentTime] = useState(0);
  const [currentBooks, setCurrentBooks] = useState([]);
  const [buffoonery, setBuffoonery] = useState(false);

  useEffect(() => {
    fetch('/api/time').then(res => res.json()).then(data => {
      setCurrentTime(data.time);
    });
  }, []);

  useEffect(() => {
    fetch('/api/books').then(res => res.json().then(data => {
      var data2 = data.map((entry) => (
        {'id': entry[0], 'title': entry[1], 'author': entry[2], 'pages': entry[3], 'review': entry[4], 'date': entry[5]}
      ));
      console.log(data2);
      setCurrentBooks(data2);
    }))
  }, []);
  console.log(currentBooks.length)

  return (
    <div className="App">
      <header className="App-header">
        <img src={buffoonery? kip : logo} className="App-logo" alt="logo" />
        <button className={buffoonery? 'clown-button' : ''} onClick={(e) => setBuffoonery(!buffoonery)}>
          {buffoonery? "Stop Clowning" : "Are you Down to Clown?"}
        </button>
        <p className={buffoonery? 'clown-paragraph' : ''}>The current time is {currentTime}.</p>
        <div className={"ag-theme-quartz-dark"} style={{width: '80%', height: '33vh'}}>
          <AgGridReact rowData={currentBooks} columnDefs={[{field: 'id'}, {field: 'title'}, {field: 'author'}, {field: 'pages'}, {field: 'review'}, {field: 'date'}]} defaultColDef={{flex: 1}}/>
        </div>
      </header>
    </div>
  );
}

export default App;
