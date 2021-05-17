import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import HighScores from './HighScores';

function App() {
  var [cookie_count, set_cookie_count] = useState(0);
  var [score_list,updateScores] = useState([]);
  var [hands, set_hands] = useState(1);
  var [grandmas, set_grandmas] = useState(0);
  var [bakeries, set_bakeries] = useState(0);
  var [hands_cost, set_hands_cost] = useState(10);
  var [grandmas_cost, set_grandmas_cost] = useState(100);
  var [bakeries_cost, set_bakeries_cost] = useState(1000);

  getHighScores().then((scores)=>updateScores(scores));

  function add_cookies() {
    set_cookie_count(cookie_count + hands + 10 * grandmas + 100 * bakeries);
  }

async function getHighScores() {
  const returnObj = await fetch('/highScores')
  if (returnObj.ok) {
    try {
      let parsed = await returnObj.json();
      return parsed;
    }
    catch (e) {
      return [];
    }
  }
  else {
    return [];
  }
}

async function postMyScore(scoreObj) {
  try {
  const request = await fetch ( '/saveScore', {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(scoreObj)
  }
  )
  return await request.json();
  }
  catch (e) {
    console.error("Failed to save score "+ e);
  }

}

function buildScoreObj(name) {
  return {name: name, score: cookie_count};
}

async function submitMyScore(myName) {
  let scoreObj = buildScoreObj(myName);
  console.log("Posting score: ", postMyScore(scoreObj));
  let newHighScores = await getHighScores();
  console.log(newHighScores);
  updateScores(newHighScores);
}

  function upgrade(uprade_type) {
    switch (uprade_type) {
      case "grandma":
        if (cookie_count < grandmas_cost) {
          return;
        }
        set_grandmas(grandmas + 1);
        set_cookie_count(cookie_count - grandmas_cost);
        set_grandmas_cost(grandmas_cost + 10 * grandmas);
        break;
      case "bakery":
        if (cookie_count < bakeries_cost) {
          return;
        }
        set_bakeries(bakeries + 1);
        set_cookie_count(cookie_count - bakeries_cost);
        set_bakeries_cost(bakeries_cost + bakeries ^ 2);
        break;
      default:
        if (cookie_count < hands_cost) {
          return;
        }
        set_hands(hands + 1);
        set_cookie_count(cookie_count - hands_cost);
        set_hands_cost(hands_cost + grandmas + bakeries);
        break;
    }
  }


  const dummyHighScoreList = [
    {name: 'Eggert', score: '9001'},
    {name: 'Christian', score: '12'},
    {name: 'Ning', score:'37'},
    {name: 'Sash', score:'37'}]

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
            <td colSpan="1"></td>
            <td colSpan="3">
            <HighScores highScoreList = {score_list} submitFunction = {submitMyScore}></HighScores>   
            </td>
          </tr>
          <tr>
            <td width="500px">
              <p className="shop">Current Setup</p>
              <p>Number of hands: {hands}</p>
              <p>Number of grandmas: {grandmas}</p>
              <p>Number of bakeries: {bakeries}</p>
            </td>
            <td width="800px">
              <h1>
                <p id="count">You have {cookie_count} cookies!</p>
                <p>You produce {hands + 10 * grandmas + 100 * bakeries} per click!</p>
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
              <p onClick={() => {upgrade("something")}}> Buy hand for {hands_cost}</p>
              <p onClick={() => {upgrade("grandma")}}> Buy grandma for {grandmas_cost}</p>
              <p onClick={() => {upgrade("bakery")}}> Buy bakery for {bakeries_cost}</p>
            </td>
          </tr>
        </table>
      </header>
    </div>
  );
}

export default App;