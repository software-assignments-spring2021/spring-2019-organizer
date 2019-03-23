import PropTypes from 'prop-types'; //strict proptype checking
import React from 'react';
import EventDot from './EventDot';

//list of eventdots
class Events extends React.Component {
    render() {
        const props = this.props;
        return (
            <ol 
                className='eventsList'
                style={{
                    listStyle: 'none'
                }}
            >
                {props.eventArray.map((date, index) => 
                    <EventDot
                        key={index}
                        label={date}
                        position={(1+index)*150 + 200 + 'px'}
                    />
                )}
            </ol>
        );
    }
}

//requires an array of events
Events.propTypes = {
    eventArray: PropTypes.arrayOf(
        PropTypes.string.isRequired).isRequired
}

export default Events;