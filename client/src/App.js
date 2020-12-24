import React from 'react';
import { 
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom"
import LandingPage from './components/views/LandingPage/LandingPage'
import LoginPage from './components/views/LoginPage/LoginPage'
import RegisterPage from './components/views/RegisterPage/RegisterPage'


function App() {
  return (
    <Router>
      <div>
        <Route exact path="/" component={LandingPage} /> {/* 방법1 */}

        <Route exact path="/login">
          <LoginPage />                         {/* 방법2 */}
        </Route>
        <Route exact path="/register">
          <RegisterPage />
        </Route> 
        
      </div>
    </Router>
  );
}



export default App;
