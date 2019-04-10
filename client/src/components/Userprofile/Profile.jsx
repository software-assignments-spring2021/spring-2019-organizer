import React from 'react';
import Radium from 'radium';
import { Nametab, Majortab} from './Profiletab';
//import PropTypes from 'prop-types'; leave for later

//base sytle for the user profile div
const profileStyle = {
    base: {
        width: '100%',
        height: '70px',
        overflow: 'hidden',
        position: 'fixed',
        backgroundColor: '#75abbc'
    }
}

//style for the photo
const photoStyle = {
    borderRadius: '50%',
    position: 'fixed',
    overflow: 'hidden',
    marginBottom: '10px',
    border: '2px solid #ffffff',
    width: '50px',
    height: '50px',
    right: '15px',
    top: '10px',
    transition: 'right 0.5s'
}

//style for a groups of tabs
//fading in has some issue...
const groupStyle = {
    display: 'none',
    position: 'fixed',
    right: '5px',
    top: '20px',
    transition: 'opacity 0.6s linear 0.6s',
    opacity: '0'
}

//style for the name div
const orgStyle = {
    fontSize: '30px',
    fontFamily: 'Monoton, cursive',
    color: '#ffffff',
    top: '14px',
    position: 'fixed',
    left: '10px'
}

class Profile extends React.Component{

    constructor(props) {
        super(props);
        this.handleHover = this.handleHover.bind(this);
        this.handleLeave = this.handleLeave.bind(this);
    }

    //display user infomation when hovered
    handleHover = function(e) {
        const ele = document.querySelector('.tabGroup');
        const userimg = document.querySelector('.profile img');
        userimg.style.right = '105px';
        userimg.style.boxShadow = '0 0 60px #ffffff';
        ele.style.display = 'block';
        ele.style.opacity = '1';
        e.preventDefault();
    }

    //hide information when released
    handleLeave = function(e) {
        const ele = document.querySelector('.tabGroup');
        ele.style.opacity = '0';
        ele.style.display = 'none';
        const userimg = document.querySelector('.profile img');
        userimg.style.right = '15px';
        userimg.style.boxShadow = '0 0 0px #ffffff';
        e.preventDefault();
    }

    render() {
        //check if user profile photo is provided
        const props = this.props;
        let myimg = 'no_image.gif';
        if(props.image !== undefined) {
            myimg = props.image;
        }
        return (
            <div className='profile' style={profileStyle.base}>
                <h1 style={orgStyle}>Organizer</h1>
                <img src={myimg} alt='profile_img' style={photoStyle}
                onMouseOver={this.handleHover}
                onMouseLeave={this.handleLeave}
                />
                <div className='tabGroup' style={groupStyle} 
                onMouseOver={this.handleHover}
                onMouseLeave={this.handleLeave}>
                    <Nametab item={props.name}/>
                    <Majortab item={props.major}/>
                </div>
            </div>
        )
    }
}

export default Radium(Profile);