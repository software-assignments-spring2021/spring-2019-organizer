import React from 'react';
import '../css/Timeline.css';
require('flickity');

//credit: codepen user Anders Grimsrud
class Timeline extends React.Component{
    render() {
    return (
        <div className="lineDiv">
        <div className="line"></div>
        <div className="Timeline" data-flickity='{ 
         "groupCells": 2, "cellAlign": "left", "setGallerySize": false,
         "fade": true }'>
            <div className="carousel-cell">
                <div className='timenode'>
                Point 1
                <span className="details">
                Description of point 1
                </span>
                </div>
            </div>
            <div className="carousel-cell">
                <div className='timenode'>
                Point 1
                <span className="details">
                Description of point 1
                </span>
                </div>
            </div>
            <div className="carousel-cell">
                <div className='timenode'>
                Point 1
                <span className="details">
                Description of point 1
                </span>
                </div>
            </div>
            <div className="carousel-cell">
                <div className='timenode'>
                Point 1
                <span className="details">
                Description of point 1
                </span>
                </div>
            </div>
            <div className="carousel-cell">
                <div className='timenode'>
                Point 1
                <span className="details">
                Description of point 1
                </span>
                </div>
            </div>
            <div className="carousel-cell">
                <div className='timenode'>
                Point 2
                <span className="details">
                Description of point 2
                </span>
                </div>
            </div>
            <div className="carousel-cell">
                <div className='timenode'>
                Point 3
                <span className="details">
                Description of point 3
                </span>
                </div>
            </div>
        </div>
        </div>
    );
    }
}

export default Timeline;