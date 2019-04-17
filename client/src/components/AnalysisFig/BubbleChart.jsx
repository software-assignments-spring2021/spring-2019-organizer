import React from 'react';
const echarts = require('echarts/lib/echarts');

//require echarts component
require('echarts/lib/component/tooltip');
require('echarts/lib/component/title');
require('echarts/lib/chart/bar');

const barStyle = {
    left: '30%',
    top: '100px',
    width: '600px',
    height: '400px'
}

//a bar chart component
class BubbleChart extends React.Component{
    constructor(props) {
        super(props);
        this.drawChart = this.drawChart.bind(this);
    }
    //function to call when component mounted
    componentDidMount() {
        this.drawChart();
    }

    drawChart = function() {
        let myChart = echarts.init(document.querySelector('.bubblediv'));
        const name = this.props.name;
        //get the data when the task done is clicked (yaxis)
        const hourData = this.props.hourData; 
        //get the day data when the task done is clicked (xaxis)
        const daydata = this.props.ydata;
        //data types (course hws)
        const hws = this.props.hws;
        myChart.setOption({
            title: {
                text: name
            },
            tooltip: {},
            xAxis: {
                splitLine: {
                    lineStyle: {
                        type: 'dashed'
                    }
                }
            },
            yAxis: {
                splitLine: {
                    lineStyle: {
                        type: 'dashed'
                    }
                },
                scale: true
            },
            series: [{
                name: 'hw1',
                type: 'scatter',
                data: ydata
            }]
        })
    }

    render() {
        return (
            <div className="bubblediv" style={barStyle}>
            </div>
        )
    }
}

export default BubbleChart;