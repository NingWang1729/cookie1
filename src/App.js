import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

function App() {
  var [cookie_count, set_cookie_count] = useState(0);

  function add_cookies() {

  }

  function upgrade(uprade_type) {
    
  }

  return (
    <div className="App">
      <header className="App-header">
        <table>
          <tr>
            <td colSpan="3">
              <h1>Cookie Clicker Game</h1>
            </td>
          </tr>
          <tr>
            <td width="500px">
              <p className="shop">Current Setup</p>
            </td>
            <td width="800px">
              <h1>
                <p id="count">You have {cookie_count} cookies!</p>
              </h1>
              <img src='./cookie.png' className="App-logo" alt="logo" onClick={add_cookies}/>
              <br />
              <a
                className="App-link"
                href=""
                target=""
                rel="noopener noreferrer"
              >
                Click here to reset game!
              </a>
            </td>
            <td width="500px">
              <p className="shop">Upgrades Shop</p>
            </td>
          </tr>
        </table>
      </header>
    </div>
  );
}

export default App;