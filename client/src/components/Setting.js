import React, { Component } from 'react';
import { Card, Row, Col} from 'react-bootstrap';
import '../css/Setting.css';
// import loginstate from './Settingpage';





class Setting extends Component{



    render(){


        return(       
               
            <div id ="setting">
                {/* <Col className="titles1"> NYU Classes Organizer</Col>
                <Col className="titles1"> Please Login to NYU Classes</Col> */}
                <Card.Body className="log-box">
                    <Card.Title>
                    <Row>   
                        <Col className="text">Nickname:</Col>     
                        <Col><input type="text" className="nname" onChange={this.props.handleNickNameChange}/></Col>                     
                        <Col className="text">NetID:</Col>     
                        <Col><input type="text" className="uname" onChange={this.props.handleUserNameChange}/></Col>
                        <Col className="text">Password:</Col>
                        <Col><input type="password" className="pwd" onChange={this.props.handlePwdChange}/></Col>
                    </Row>
                    </Card.Title>
                    
                    <Col>
            
                    <button className="btn btn-primary log-btn" onClick={this.props.handleLogin}>Confirm</button>
                    <button className="btn btn-primary sign" onClick={this.props.handleSign}>Logout</button>
                
                    </Col>

                
                </Card.Body>
            
            </div>
        );
        
    }


}

export default Setting;




