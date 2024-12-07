import logo from './logo.svg';
import kip from './mudkipsip.png'
import React, { useState, useEffect } from 'react';
import './App.css';

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
      setCurrentBooks(data)
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
        <table className={buffoonery? 'clown-table' : ''}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Author</th>
              <th>Pages</th>
              <th>Review</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {currentBooks.map((book) => (
              <tr>
                {book.map((field) => (
                  <td>{field}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </header>
    </div>
  );
}

export default App;
