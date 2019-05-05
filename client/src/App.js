import React, { Component } from 'react';
import { BrowserRouter as Router, Route} from "react-router-dom";
import Sidebar from './components/Sidebar';
import Schedule from './components/Schedule';
import Settingpage from './components/Settingpage';
import Figures from './components/Figures';
import Timeline from './components/Timeline';
import Stress from './components/Stress';
import {GoogleLogin} from 'react-google-login';
import config from './config.json';
import './css/Timeline.css';

//const testprofile = 'https://raw.githubusercontent.com/nyu-software-engineering/organizer/master/documentation/web_mockup_Mark/home_page.png';

class App extends Component {
  constructor() {
    super();
    this.state = { isAutheticated: false, user: null, token: ''};
  }
  logout = () => {
    this.setState({isAuthenticated: false, token: '', user: null})
  };
  googleResponse = (response) => {
    const tokenBlob = new Blob([JSON.stringify({access_token: response.accessToken}, null, 2)], 
    {type : 'application/json'});
        const options = {
            method: 'POST',
            body: tokenBlob,
            mode: 'cors',
            cache: 'default'
        };
        fetch('http://localhost:3000/auth/google', options).then(r => {
            const token = r.headers.get('x-auth-token');
            r.json().then(user => {
                if (token) {
                    this.setState({isAuthenticated: true, user, token})
                }
            });
        })
  };

  onFailure = (error) => {
    alert(error);
  }

  render() {
    let content = !!this.state.isAuthenticated ?
      (
        <div>
        <p>Authenticated</p>
        <div>
            {this.state.user.email}
        </div>
        <div>
            <button onClick={this.logout} className="button">
                Log out
            </button>
        </div>
    </div>
      ) : 
      (
        <div>
          <GoogleLogin
          clientId={config.GOOGLE_CLIENT_ID}
          buttonText="Login"
          onSuccess={this.googleResponse}
          onFailure={this.onFailure}
          />
      </div>

      )
    
    
    return (
      
      <Router>
        <div className="App">
          <Sidebar />
          <Stress value={68} />
          <Timeline />
          <Route path="/schedules" component={Schedule} />
          <Route path="/subject/:subject" component={Schedule} />
          <Route path="/tag/:tag" component={Schedule} />
          <Route path="/analysis" component={Figures}/>
          <Route path="/setting" component={Settingpage} 
          />
        </div>
      </Router>
    );
  }
}


export default App;
