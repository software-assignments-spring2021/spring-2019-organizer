import React, { Component } from 'react';
import { Card, Row, Col} from 'react-bootstrap';

import '../css/Login.css';


class Login extends Component{

    render(){
        return(
            
            <div id ="login">
                <Col className="titles1"> NYU Classes Organizer</Col>
                <Col className="titles1"> Please Login to NYU Classes</Col>
                <Card.Body className="log-box">
                    <Card.Title>
                      <Row>                        
                        <Col className="text">NetID:</Col>     
                        <Col><input type="text" className="uname" onChange={this.props.handleUserNameChange}/></Col>
                        <Col className="text">Password:</Col>
                        <Col><input type="password" className="pwd" onChange={this.props.handlePwdChange}/></Col>
                      </Row>
                    </Card.Title>
                    
                    <Col>
                    <button className="btn btn-primary log-btn" onClick={this.props.handleLogin}>Login</button>
                    <button className="btn btn-primary sign" onClick={this.props.handleSign}>Sign in with Email</button>
                    </Col>
 
                
                </Card.Body>
              
            </div>
        );
    }


}

export default Login;

// handleUserNameChange={this.handleUserNameChange}
// handlePwdChange={this.handlePwdChange}
// handleSign={this.handleSign}
// handleLogin={this.handleLogin}