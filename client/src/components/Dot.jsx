import React from 'react';
import '../css/Timeline.css';
require('flickity');

class Dots extends React.Component {
    constructor(props) {
        super(props);
        this.update = this.update.bind(this);
        this.state = {
            date: this.props.date,
            text: this.props.text
        }
    }

    update(ndate, ntext) {
        this.setState({date: ndate, text: ntext});
    }

    render() {
        return (
            <div className="carousel-cell">
                <div className='timenode'>
                {this.state.date}
                <span className="details">
                {this.state.text}
                </span>
                </div>
            </div>
        )
    }
}

export default Dots;