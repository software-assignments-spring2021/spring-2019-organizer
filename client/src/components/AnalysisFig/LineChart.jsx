import React from 'react';
const echarts = require('echarts/lib/echarts');

//require echarts component
require('echarts/lib/component/tooltip');
require('echarts/lib/component/title');
require('echarts/lib/chart/line');

//simple style
const linestyle = {
    width: '100%',
    height: '100%'
}
const linedivstyle = {
    height: '70%'
}


//style for text
const textStyle = {
    position: 'absolute',
    height: '10%',
    bottom: '0',
    fontWeight: 'bold'
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
            <div style={linedivstyle}>
            
            <div className="linediv" style={linestyle}>       
            </div>
            <span className="bubble" style={textStyle}> Blue line is the estimated time spent on your assignments during the day. 
            Red line is the actual time spent on your assignments during the day.</span>
            </div>


        )
    }
}

export default LineChart;