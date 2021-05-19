import React from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import MainPage from './components/MainPage';
import DiaryPage from './components/DiaryPage';
import Diary from './components/_Diary';

function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route exact path="/" component={ MainPage }/>
          <Route path="/diaries" component={ DiaryPage }/>
          <Route path="/diary/:title" component={ Diary }/>
        </Switch>
      </Router>
    </div>
  )
}

export default App
