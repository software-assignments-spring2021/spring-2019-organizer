import React from 'react';
//import radium from 'radium';
import * as d3 from 'd3';

const barStyle = {
    position: 'fixed',
    left: '100px',
    top: '10px'
}

//a bar chart component
class Barchart extends React.Component{
    //calulate the initial state
    state = {
        height: 10 + 10 * Math.max(...this.props.data),
        width: this.props.data.length * 30
    }

    //function to call when component mounted
    componentDidMount() {
        this.drawChart();
    }

    //function to draw the chart
    drawChart = function() {
        const data = this.props.data;
        const svg = d3.select(".chartdiv")
                        .append("svg")
                        .attr("width", this.state.width)
                        .attr("height", this.state.height)
                        .style('margin-left', 100);
                        
        svg.selectAll('rect')
            .data(data)
            .enter()
            .append('rect')
            .attr('x', (d, i) => i * 70)
            .attr('y', (d, i) => 300 - d * 10)
            .attr('width', 25)
            .attr('height', (d, i) => d * 10)
            .attr('fill', 'blue');
    }

    render() {
        return (
            <div className="chartdiv" style={barStyle}>
            </div>
        )
    }
}

export default Barchart;