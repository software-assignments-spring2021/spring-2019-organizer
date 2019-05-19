import React, { Component } from 'react';
import { Card, Row, Col} from 'react-bootstrap';
import '../css/Setting.css';
import SideBar from './Sidebar';
// import loginstate from './Settingpage';





class Setting extends Component{
    constructor(props) {
        super(props);
        this.name = React.createRef();
        this.id = React.createRef();
        this.pw = React.createRef();
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e) {
        const name = this.name.current;
        const usrname = name.value;
        const id = this.id.current;
        const netid = id.value;
        const pw = this.pw.current;
        const password  = pw.value;
        this.props.handleChange(usrname, netid, password);
    }

    render(){


        return(
            <div>       
            <SideBar /> 
            <div id ="setting">
                {/* <Col className="titles1"> NYU Classes Organizer</Col>
                <Col className="titles1"> Please Login to NYU Classes</Col> */}
                <Card.Body className="log-box">
                    <Card.Title>
                    <Row>   
                        <Col className="text">Nickname:</Col>     
                        <Col><input type="text" className="nname" ref={this.name}/></Col>                     
                        <Col className="text">NetID:</Col>     
                        <Col><input type="text" className="uname" ref={this.id}/></Col>
                        <Col className="text">Password:</Col>
                        <Col><input type="password" className="pwd" ref={this.pw}/></Col>
                    </Row>
                    </Card.Title>
                    
                    <Col>
            
                    <button className="btn btn-primary log-btn" onClick={this.handleClick}>Save</button>
                
                    </Col>

                
                </Card.Body>
            
            </div>
            </div>
        );
        
    }


}

export default Setting;




