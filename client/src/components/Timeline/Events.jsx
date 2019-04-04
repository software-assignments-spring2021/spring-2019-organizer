import PropTypes from 'prop-types'; //strict proptype checking
import React from 'react';
import EventDot from './EventDot';

//list of eventdots
class Events extends React.Component {
    render() {
        const props = this.props;

        //a list to keep due dates extracted from the
        //object passed in
        let eventList = [];
        for(const item in props.eventArray) {
            if(props.eventArray.hasOwnProperty(item)) {
                eventList.push(item);
            }
        }
        console.log(eventList);
        
        return (
            <span>
            <i className="arrow left"></i>
            <ol 
                className='eventsList'
                style={{
                    listStyle: 'none'
                }}
            >
                {eventList.map((date, index) => 
                //provide a list of hws of a date
                    <EventDot
                        key={index}
                        label={date}
                        position={(1+index)*150 + 200 + 'px'}
                        hwArray = {props.eventArray[date]}
                    />
                )}
            </ol>
            <i className="arrow right"></i>
            </span>
        );
    }
}

//requires an array of events
Events.propTypes = {
    eventArray: PropTypes.object.isRequired,
}

export default Events;