import React, { Component } from 'react';
import Login from './Login';
import { Redirect } from 'react-router';
// import SidebarLink from './Sidebar'

const UNAME = '123';
const PWD = '123';

class Loginpage extends Component {
  constructor(props){
    super(props);
    this.state=({
      userName:'123',
      pwd:'123',
      redirect: false

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
    state = {
      redirect: false
    }

    handleLogin = () =>{
      if(this.state.userName===UNAME&&this.state.pwd===PWD){
        alert("Login successfully!"); 

        this.setState({redirect: true})

        if (this.state.redirect) {
          return <Redirect to='/schedules' />
        
        
        
  
      };
           
          
           
      }
      else if(this.state.userName!==UNAME){
        alert("Fail to log in: Username is wrong!");
      }
      else if(this.state.pwd!==PWD){
        alert("Fail to log in: Passwoed is wrong! ");
      }
      else{
        alert("Fail to log!");
      }
    }

    handleSign = () =>{
      alert("Sign in successfully!");
    }

    
  render() {
    if (this.state.redirect) {
      return <Redirect to="/schedules" />
    }
    
    return (
      

      <div className="loginpage">   
        <Login         
          handleUserNameChange={this.handleUserNameChange}
          handlePwdChange={this.handlePwdChange}
          handleSign={this.handleSign}
          handleLogin={this.handleLogin}        
        />
      
        
      </div>
      
    );
  }
}

export default Loginpage;