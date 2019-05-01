import React, { Component } from 'react';
// import {Router, Route} from "react-router-dom";
import Setting from './Setting';
import { Redirect } from 'react-router';
import SidebarLink from './Sidebar'
// import Schedule from './Schedule'
import NavLink from 'react-bootstrap/NavLink';


const UNAME = '123';
const PWD = '123';

class Settingpage extends Component {
  constructor(props){
    super(props);
    this.state=({
      NickName: "",
      userName:'123',
      pwd:'123',
      redirect: false,
      loginstate: false


    })

  }
    handleNickNameChange = (e) =>{
      this.setState({
        NickName:e.target.value
      })
    }
  

    handleUserNameChange = (e) =>{
      this.setState({
        userName:e.target.value
      })
    }

    handlePwdChange = (e) =>{
      this.setState({
        pwd:e.target.value
      })
    }

    handleNickNameChange = (e) =>{
      this.setState({
        NickName:e.target.value
      })
    }

    handleLogin = () =>{
      if(this.state.userName===UNAME&&this.state.pwd===PWD){
        alert("Welcome to Organizer, you have been logged in successfully!"); 
        // this.setState({loginstate: true})
        // var userName = this.state.userName;
        // var pwd = this.state.pwd;

        this.setState({redirect: true})
        this.setState({loginstate: true})

        if (this.state.redirect) {
          
          return <Redirect to='/schedules'/>
          

        };

          
           
      }
      else if(this.state.userName!==UNAME){
        alert("Fail to log in: Username is wrong!");
      }
      else if(this.state.pwd!==PWD){
        alert("Fail to log in: Passwoed is wrong! ");
      }
      else{
        alert("Fail to login");
      }
    }
    
    //handle logout
    handleSign = () =>{
      if (this.state.loginstate === false){
        alert("You have not logged in")
      }
      else{
        alert("Logout successfully!");
     }
    }

    
  render() {
    if (this.state.redirect) {

      return (
      <NavLink>
        <Redirect to="/schedules" />
        <SidebarLink to="/schedules" label="Schedules"/>
      
        {/* <Router>
          <SidebarLink to="/schedules" label="Schedules"/>
        </Router> */}
      </NavLink>
      )
      

    }
    
    // if (this.state.redirect) {
    //   return 

    //   // return <SidebarLink to="/schedules" label="Schedules"/>

    // }

    else{
    
    return (
      <div className="Settingpage">   
        <Setting         
          handleUserNameChange={this.handleUserNameChange}
          handlePwdChange={this.handlePwdChange}
          handleSign={this.handleSign} //handle logout
          handleLogin={this.handleLogin}   
          handleNickNameChange={this.handleNickNameChange} 
          
        />
   
      </div>
    
    );
    
    }
    
  }
}

export default Settingpage;
