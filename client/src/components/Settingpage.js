import React, { Component } from 'react';
import Setting from './Setting';
import '../css/Setting.css';
import Sidebar from './Sidebar';
import { Redirect } from "react-router-dom";

class Settingpage extends Component {
  constructor(props){
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      loggedin: false
    };
  }

  handleChange(usr, id, pw) {
    const newUsr = {
      name: usr,
      netid: id,
      password: pw
    };
    console.log(newUsr);
    fetch('/user',{
      method: "POST",
      body: JSON.stringify(newUsr),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
    .then((res) => {
      console.log(res);
      if (res.ok) {
        console.log();
        this.setState({loggedin: true});
      }
    })
    .catch(err => {
      if (err) {
        console.log(err);
        alert('There might be some issue while crawling your tasks, try to make sure your netid and password are enter correctly')
      }
    })
  }
  
    
  render() {
      return (
      !this.state.loggedin ?
      <div className="Settingpage">
        <div className="Warning">
          <span className="alert">Warning: Please be aware that we will store your netid and password as plain text!</span><br></br>
          It is because our crawler need to use your plain password to fetch your NYUclasses data.
          We are still trying to find way to solve this problem but for now we strongly encourage you to explore our website as guest! 
        </div>
        <Sidebar />   
        <span className="instruction">Type in your NYU info below if you want to let Organizer to fetch your data in NYUclasses</span>
        <Setting         
          handleChange={this.handleChange} 
          
        />
      </div>
      : <Redirect to={{
        pathname: '/schedules',
        state: { reload: false }
      }}
      />
      );
      
      }
    
  }


export default Settingpage;
