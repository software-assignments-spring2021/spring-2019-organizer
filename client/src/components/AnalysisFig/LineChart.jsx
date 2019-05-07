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
            title: {
                text: this.props.name
            },
            legend: {
                data: ['predicted', 'actual']
            },
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
                name: 'predicted',
                data: predTime,
                type: 'line',
                areaStyle: {
                    color: 'rgba(140, 160, 215, 0.5)'
                }
            },
            {
                name: 'actual',
                data: actualTime,
                type: 'line',
                areaStyle: {
                    color: 'rgba(161, 77, 160, 0.5)'
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