import React from 'react';
import Radium from 'radium';
import PropTypes from 'prop-types';

//base sytle for the user profile div
const profileStyle = {
    base: {
        width: '200px',
        height: '200px',
        overflow: 'hidden',
        position: 'fixed',
        backgroundColor: '#75abbc'
    }
}

//style for the photo
const photoStyle = {
    borderRadius: '50%',
    overflow: 'hidden',
    marginBottom: '10px',
    border: '2px solid #ffffff',
    width: '100px',
    height: '100px'
}

class Profile extends React.Component{
    render() {
        const props = this.props;
        let myimg = 'no_image.gif';
        if(props.image !== undefined) {
            myimg = props.image;
        }
        return (
            <div className='profile' style={profileStyle.base}>
                <img src={myimg} alt='profile_img' style={photoStyle}/>
            </div>
        )
    }
}

export default Radium(Profile);