import React from 'react';
const echarts = require('echarts/lib/echarts');

//require echarts component
require('echarts/lib/component/tooltip');
require('echarts/lib/component/title');
require('echarts/lib/chart/scatter');

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
        this.colors = [
            'rgba(251, 118, 123, 0.7)', 
            'rgba(129, 227, 238, 0.7)',
        ]
        this.series = []
        let i;
        const courses = this.props.courses;
        for (i = 0; i < courses.length; ++i) {
            const newobject = {
                type: 'scatter',
                symbolSize: function (data) {
                    return 10 * data[2];
                }
            };
            newobject.name = courses[i];
            newobject.data = this.props.data[i];
            newobject.itemStyle = {normal: {color: this.colors[i]}};
            this.series.push(newobject);
        }
        console.log(this.series);
        this.legend = this.props.courses;
    }
    //function to call when component mounted
    componentDidMount() {
        this.drawChart();
    }

    drawChart = function() {
        let myChart = echarts.init(document.querySelector('.bubblediv'));
        const name = this.props.name;
        const myseries = this.series;
        const mylegend = this.legend;
        const option = {
            title: {
                text: name
            },
            legend: {
                right: 10,
                data: mylegend
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
                }
            },
            series: myseries
        };
        console.log(option);
        myChart.setOption(option);
    }

    render() {
        return (
            <div className="bubblediv" style={barStyle}>
            </div>
        )
    }
}

export default BubbleChart;