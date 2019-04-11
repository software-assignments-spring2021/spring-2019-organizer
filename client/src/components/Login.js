import React, { Component } from 'react';
import '../css/Login.css';

const UNAME = '123456';
const PWD = '123456';

class Login extends Component{
    constructor(){
        super();
        this.state=({
          userName:'123456',
          pwd:'123456'
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
    
      handleLogin = () =>{
        if(this.state.userName===UNAME&&this.state.pwd===PWD){
          alert("Login successfully!");
        }
        else if(this.state.userName!==UNAME){
          alert("Fail to log in:Username is wrong!");
        }
        else if(this.state.pwd!==PWD){
          alert("Fail to log in:Passwoed is wrong! ");
        }
        else{
          alert("Fail to log!");
        }
      }
    
      handleSign = () =>{
        alert("Sign in successfully!");
      }
    

    render(){
        return(
            
            <div className="login">
                <h2>Welcome to Log in</h2>
                <div className="log-box">
                    <tr>
                        <td className="text">Username:</td>
                        <td><input type="text" className="uname" onChange={this.props.handleUserNameChange}/></td>
                    </tr>
                    <tr>
                        <td className="text">Password:</td>
                        <td><input type="password" className="pwd" onChange={this.props.handlePwdChange}/></td>
                    </tr>
                    <button className="log-btn" onClick={this.props.handleLogin}>Login</button>
                    <button className="sign" onClick={this.props.handleSign}>sign in with Email</button>
                
                </div>
            </div>
        );
    }


}

export default Login;