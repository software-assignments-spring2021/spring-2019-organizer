import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect} from "react-router-dom";
import Sidebar from './components/Sidebar';
import Schedule from './components/Schedule';
import Settingpage from './components/Settingpage';
import Figures from './components/Figures';
import { GoogleLogin } from 'react-google-login';
import config from './config.json';

//const testprofile = 'https://raw.githubusercontent.com/nyu-software-engineering/organizer/master/documentation/web_mockup_Mark/home_page.png';

class App extends Component {
  constructor() {
    super();
    this.state = { isAuthenticated: false, user: null, token: ''};
  }
  logout = () => {
    this.setState({isAuthenticated: false, token: '', user: null});
  }
  googleResponse = (response) => {
    // const tokenBlob = new Blob([JSON.stringify({access_token: response.accessToken}, null, 2)], {type : 'application/json'});
    // const options = {
    //     method: 'POST',
    //     body: tokenBlob,
    //     mode: 'cors',
    //     cache: 'default'
    // };
    const token = { token : response.accessToken };
    const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(token),
        mode: 'cors',
    };
    fetch('/auth/google', options)
    .then((res) => {
      console.log(res);
        // const token = res.headers.get('x-auth-token');
        res.json();
    })
    .then(user => {
      console.log(user);
        // if (token) {
        //   this.setState({isAuthenticated: true, user, token})
        // }
    });
  };
  
  onFailure = (error) => {
    console.log(error);
  }

  render() {
    return (
      <Router>
        <div className="App">
          {/* <Sidebar /> */}
          <Route exact path="/" render={() => {
            return <Login auth={this.state.isAuthenticated} googleResponse={this.googleResponse} onFailure={this.onFailure} />;
          }}/>
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

function Login(props) {
  return (props.auth ?
    <Redirect to="/schedules"/>
    : 
    <div>
      <GoogleLogin
        clientId={config.GOOGLE_CLIENT_ID}
        buttonText="Login"
        onSuccess={props.googleResponse}
        onFailure={props.onFailure}
      />
    </div>
    )
}

export default App;
