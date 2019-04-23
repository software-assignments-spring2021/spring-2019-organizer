import React from 'react';
const echarts = require('echarts/lib/echarts');

//require echarts component
require('echarts/lib/component/tooltip');
require('echarts/lib/component/title');
require('echarts/lib/chart/pie');

//simple style
const piestyle = {
    left: '30%',
    position: 'relative',
    top: '100px',
    width: '600px',
    height: '400px'
}

//a line chart component to analyze the students predicted time vs. actual time
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
                //show only a recent week's data
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
            <div className="piediv" style={piestyle}>
            </div>
        )
    }
}

export default LineChart;