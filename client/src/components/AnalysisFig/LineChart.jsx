import React from 'react';
//import radium from 'radium';
//import * as d3 from 'd3';
const echarts = require('echarts/lib/echarts');

//require echarts component
require('echarts/lib/component/tooltip');
require('echarts/lib/component/title');
require('echarts/lib/chart/line');

const linestyle = {
    left: '30%',
    top: '100px',
    width: '600px',
    height: '400px'
}

//a bar chart component
class LineChart extends React.Component{
    constructor(props) {
        super(props);
        this.drawChart = this.drawChart.bind(this);
    }
    //function to call when component mounted
    componentDidMount() {
        this.drawChart();
    }

    drawChart = function() {
        let myChart = echarts.init(document.querySelector('.linediv'));
        const predTime = this.props.predTime;
        const actualTime = this.props.actualTime;
        myChart.setOption({
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
            },
            yAxis: {
                type: 'value'
            },
            series: [{
                data: predTime,
                type: 'line',
                areaStyle: {
                    color: 'rgba(128, 128, 128, 0.5)'
                }
            },
            {
                data: actualTime,
                type: 'line',
                areaStyle: {
                    color: 'rgba(128, 128, 128, 0.5)'
                }
            }]
        });
    }
    render() {
        return (
            <div className="linediv" style={linestyle}>
            </div>
        )
    }
}

export default LineChart;