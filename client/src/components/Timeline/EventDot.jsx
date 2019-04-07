import Radium from 'radium'; //enable array style and hover...
import PropTypes from 'prop-types'; //strict proptype checking
import React from 'react';


//sytles for different eventdots
const dotStyle = {
    base: {
        width: '100px',
        height: '30px',
        top: 80,
        borderRadius: '10%',
        textAlign: 'center',
        position: 'absolute',
        ':hover': {
            backgroundColor: '#dfe0e2'
        }
    },
    past: {
        color: '#000000'
    },
    present: {
        color: '#ffffff'
    },
    future: {
        color: '#0f0f0f'
    }
}

//style to toggle for hw list
const hidStyle = {
    display:'none'
}

//class fot eventdots
class EventDot extends React.Component {
    constructor(props) {
        super(props);
        this.dotType = 'future';
        this.handleClick = this.handleClick.bind(this);
        this.handleOver = this.handleOver.bind(this);
        this.handleLeave = this.handleLeave.bind(this);
    }

    //function responding to hovering
    handleOver = function(e) {
        console.log("over");
        const myele = document.getElementById(this.props.label);
        console.log(myele);
        const hwlist = myele.querySelectorAll('.Hwitem');
        console.log(hwlist);
        for(const ele of hwlist) {
            ele.style.display = 'block';
        }
        e.preventDefault();
    }

    //function responding to leaving
    handleLeave = function(e) {
        console.log("leave");
        const myele = document.getElementById(this.props.label);
        const hwlist = myele.querySelectorAll('.Hwitem');
        for(const ele of hwlist) {
            ele.style.display = 'none';
        }
        e.preventDefault();
    }

    handleClick = function(e) {
        console.log(e.target);
        this.setState({dotType: 'past'});
        e.preventDefault();
    }

    //function to get the proper style for the
    //dot
    getStyle = function(dotType, pos) {
        return [
            dotStyle.base,
            dotStyle[dotType],
            {left: pos}
        ]
    }

    render() {
        const props = this.props;
        return (
            <ul
                className={`${this.dotType}`}
                onClick={this.handleClick}
                onMouseOver={this.handleOver}
                onMouseLeave={this.handleLeave}
                style={this.getStyle(this.dotType, 
                props.position)}
                id={props.label}
            >
                {props.label}
                {props.hwArray.map((hw, index)=> 
                    <li className="Hwitem"
                        key={index}
                        style={hidStyle}
                    >{hw}</li>
                )}
            </ul>
        );
    }

}

//prop checking
EventDot.propTypes = {
    position: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    hwArray: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired
};

export default Radium(EventDot);
