import React, { createContext } from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import MainPage from './components/MainPage';
import DiaryPage from './components/DiaryPage';

export const AppContext = createContext();

function App() {
  return (
    <div>
      <AppContext.Provider value={ "Hi" }>
        <Router>
          <Switch>
            <Route exact path="/" component={ MainPage }/>
            <Route path="/diaries" component={ DiaryPage }/>
          </Switch>
        </Router>
      </AppContext.Provider>
    </div>
  )
}

export default App
