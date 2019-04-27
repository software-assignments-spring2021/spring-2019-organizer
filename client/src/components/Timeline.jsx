import React from 'react';

//credit: codepen user Anders Grimsrud
class Timeline extends React.Component{
    render() {
    return (
        <ol className="Timeline">
            <li>
                Point 1
                <span className="details">
                Description of point 1
                </span>
            </li>
            <li>
                Point 2
                <span className="details">
                Description of point 2
                </span>
            </li>
            <li>
                Point 3
                <span className="details">
                Description of point 3
                </span>
            </li>
        </ol>
    );
    }
}

export default Timeline;