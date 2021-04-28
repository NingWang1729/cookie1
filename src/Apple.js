import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  var [cookie_count, set_cookie_count] = useState(0);
  var [greedy_hands, set_greedy_hands] = useState(1);
  var [hands_cost, set_hands_cost] = useState(10);
  var [grandmas, set_grandmas] = useState(0);
  var [grandmas_cost, set_grandmas_cost] = useState(100);
  var [bakeries, set_bakeries] = useState(0);
  var [bakeries_cost, set_bakeries_cost] = useState(1000);

  function add_cookie() {
    let cookie_counter = cookie_count + greedy_hands + 10 * grandmas + 100 * bakeries;
    set_cookie_count(cookie_counter);
  };

  function add_upgrade(type) {
    switch (type) {
      case "grandma":
        set_grandmas(grandmas + 1);
        set_cookie_count(cookie_count - grandmas_cost);
        set_grandmas_cost(grandmas_cost + grandmas * 2);
        break;
      case "bakery":
        set_bakeries(bakeries + 1);
        set_cookie_count(cookie_count - bakeries_cost);
        set_bakeries_cost(bakeries_cost + bakeries ^ 2);
        break;
      default:
        set_greedy_hands(greedy_hands + 1);
        set_cookie_count(cookie_count - hands_cost);
        set_hands_cost(hands_cost + grandmas + bakeries);
        break;
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <table>
          <thead>
            <tr>
              <td colSpan="3">
                <p>This is my beautiful table</p>
              </td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td width="500px">
                <p>Your set up is:</p>
                <p>Hands: {greedy_hands}</p>
                <p>Grandmas: {grandmas}</p>
                <p>Bakeries: {bakeries}</p>
              </td>
              <td width="500px">
                <h1>You have {cookie_count} cookies.</h1>
                <h2>You have {greedy_hands + 10 * grandmas + 100 * bakeries} cookies per click.</h2>
                <img src="cookie.png" className="App-logo" alt="logo" onClick={add_cookie}/>
                <p onClick={add_cookie}>
                  Click cookies for cookies!
                </p>
                <a
                  className="App-link"
                  href=""
                  target=""
                  rel="noopener noreferrer"
                >
                  Click to reset game!
                </a>
              </td>
              <td width="500px">
                <p>Buy Upgrades:</p>
                <p onClick={()=>{add_upgrade("hand")}}>Buy Hand for {hands_cost}</p>
                <p onClick={()=>{add_upgrade("grandma")}}>Buy Grandma for {grandmas_cost}</p>
                <p onClick={()=>{add_upgrade("bakery")}}>Buy Bakery for {bakeries_cost}</p>
              </td>
            </tr>
          </tbody>
        </table>
      </header>
    </div>
  );
}

export default App;
