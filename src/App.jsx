import React from 'react'
import "./App.css"
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Home from './components/Home';
import Editor from './components/Editor';

function App() {
  return (
    <>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
      <path fill="#1c1f42" fillOpacity="1" d="M0,224L26.7,192C53.3,160,107,96,160,74.7C213.3,53,267,75,320,74.7C373.3,75,427,53,480,64C533.3,75,587,117,640,133.3C693.3,149,747,139,800,112C853.3,85,907,43,960,64C1013.3,85,1067,171,1120,202.7C1173.3,235,1227,213,1280,202.7C1333.3,192,1387,192,1413,192L1440,192L1440,0L1413.3,0C1386.7,0,1333,0,1280,0C1226.7,0,1173,0,1120,0C1066.7,0,1013,0,960,0C906.7,0,853,0,800,0C746.7,0,693,0,640,0C586.7,0,533,0,480,0C426.7,0,373,0,320,0C266.7,0,213,0,160,0C106.7,0,53,0,27,0L0,0Z"></path>
      </svg>

      <h1>Photo editor</h1>
      <Router>
        <Switch>
          <Route path="/editor">
            <Editor/>
          </Route>
          <Route exact path="/">
            <Home/>
          </Route>
        </Switch>
      </Router>
    </>
  )
}

export default App
