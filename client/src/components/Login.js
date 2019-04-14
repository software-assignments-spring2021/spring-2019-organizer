import React, { Component } from 'react';
import { Card, Row, Col} from 'react-bootstrap';
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
            
            <Card.Title id ="login">
                <Card.Header>Welcome to Log in</Card.Header>
                <Card.Body className="log-box">
                    <Card.Title>
                        <Col className="text">Username:</Col>
                        <Col><input type="text" className="uname" onChange={this.props.handleUserNameChange}/></Col>
                    </Card.Title>
                    <Card.Title>
                        <Row>
                        <Col className="text">Password:</Col>
                        <Col><input type="password" className="pwd" onChange={this.props.handlePwdChange}/></Col>
                        </Row>
                    </Card.Title>
                    <Col>
                    <button className="btn btn-primary log-btn" onClick={this.props.handleLogin}>Login</button>
                    <button className="btn btn-primary sign" onClick={this.props.handleSign}>sign in with Email</button>
                    </Col>
                
                </Card.Body>
            </Card.Title>
        );
    }


}

export default Login;