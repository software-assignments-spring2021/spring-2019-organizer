import Radium from 'radium'; //enable array style and hover...
import PropTypes from 'prop-types'; //strict proptype checking
import React from 'react';


//sytles for different eventdots
const dotStyle = {
    base: {
        width: '100px',
        height: '30px',
        top: 5,
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

//class fot eventdots
class EventDot extends React.Component {
    constructor(props) {
        super(props);
        this.dotType = 'future';
        this.handleClick = this.handleClick.bind(this);
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
        return (
            <li
                className={`${this.dotType}`}
                onClick={this.handleClick}
                style={this.getStyle(this.dotType, 
                this.props.position)}
            >
                March 23
            </li>
        );
    }

}

EventDot.propTypes = {
    position: PropTypes.number.isRequired
};

export default Radium(EventDot);
