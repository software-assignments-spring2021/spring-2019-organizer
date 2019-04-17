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
        let myChart = echarts.init(document.querySelector('.chartdiv'));
        const name = this.props.name;
        const xdata = this.props.xdata;
        const ydata = this.props.ydata;
        myChart.setOption({
            title: {
                text: name
            },
            tooltip: {},
            xAxis: {
                data: xdata
            },
            yAxis: {},
            series: [{
                name: 'time',
                type: 'bar',
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