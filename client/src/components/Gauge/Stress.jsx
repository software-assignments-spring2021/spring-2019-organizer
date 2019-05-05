import React from 'react';
import Gauge from 'canvas-gauges';

//basic style for the gauge
const canvasStyle = {
    marginTop: '20px',
    position: 'relative',
    left: '80%'
}

//stress level gauge class
class Stress extends React.Component{
    componentDidMount() {
        const options = {
            renderTo: 'stressLevel',
            width: 150,
            height: 150,
            valueBox: false,
            minorTicks: 10,
            majorTicks: [0, 100],
            startAngle: 90,
            ticksAngle: 180,
            borders: false,
            highlights: [
                {
                    from: 0,
                    to: 10,
                    color: '#42f477'
                },
                {
                    from: 10,
                    to: 30,
                    color: '#c1f441'
                },
                {
                    from: 30,
                    to: 50,
                    color: '#eef441'
                },
                {
                    from: 50,
                    to: 70,
                    color: '#f4d341'
                },
                {
                    from: 70,
                    to: 90,
                    color: '#f4a941'
                },
                {
                    from: 90,
                    to: 100,
                    color: '#f47041'
                }
            ],
            colorNumbers: '#968c88',
            needleColor: '#fff',
            borderShadowWidth: 0
        };
        const g = new Gauge.RadialGauge(options);
        g.value = this.props.value;
        g.draw();
    }

    render() {
        return (
            <canvas id='stressLevel' style={canvasStyle}>
            </canvas>
        );
    }
}

export default Stress;