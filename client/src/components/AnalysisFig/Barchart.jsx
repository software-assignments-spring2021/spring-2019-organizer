import React from 'react';
const echarts = require('echarts/lib/echarts');

//require echarts component
require('echarts/lib/component/tooltip');
require('echarts/lib/component/title');
require('echarts/lib/chart/bar');
require('echarts/lib/component/legend');

const BarStyle = {
    width: '100%',
    height: '100%'
}

const bardivstyle = {
    height: '70%'
}
const textStyle = {
    position: 'absolute',
    height: '10%',
    bottom: '0',
    fontWeight: 'bold'
    
}


//a bar chart component
class Barchart extends React.Component{
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
        const y1data = this.props.pdata;
        const y2data = this.props.adata;
        const g1 = {
            color: '#8ca0d7',
        };
        const g2 = {
            color: '#a14da0',
        };
        myChart.setOption({
            title: {
                text: name
            },
            tooltip: {},
            legend: {
                data: ['predicted time', 'actual time']
            },
            xAxis: {
                data: xdata
            },
            yAxis: {},
            series: [{
                name: 'predicted time',
                type: 'bar',
                data: y1data,
                itemStyle: g1
            },
            {
                name: 'actual time',
                type: 'bar',
                data: y2data,
                itemStyle: g2
            }]
        })
    }

    render() {
        return (
        <div style={bardivstyle}>

            <div className="chartdiv" style={BarStyle}>       
            </div>
            <span className="bubble" style={textStyle}> Estimated and actual time spent on each assignments </span>
        </div>
        )
        

    }
}

export default Barchart;