import React from 'react';
import Gauge from 'canvas-gauges';

class Stress extends React.Component{
    componentDidMount() {
        console.log(Gauge);
        const options = {
            renderTo: 'stressLevel',
            colorNumbers: 'red',
            width: 100,
            height: 300
        };
        const g = new Gauge.LinearGauge(options);
        g.value = this.props.value;
        g.draw();
    }

    render() {
        return (
            <canvas id='stressLevel'>
            </canvas>
        );
    }
}

export default Stress;