import React from 'react';
const echarts = require('echarts/lib/echarts');

//require echarts component
require('echarts/lib/component/tooltip');
require('echarts/lib/component/title');
require('echarts/lib/chart/scatter');
require('echarts/lib/component/legend');

class BubbleObject {
    constructor(name, data, itemStyle) {
        this.type = 'scatter';
        this.symbolSize = function (data) {
            return 10 * data[2];
        };
        this.name = name;
        this.data = data;
        this.itemStyle = itemStyle;
    }   
}


const barStyle = {
    width: '100%',
    height: '100%'
}

//a bubble chart component to analyze the time stamps of 'done time'
class BubbleChart extends React.Component{
    constructor(props) {
        super(props);
        this.drawChart = this.drawChart.bind(this);
        //a limited number of color options
        this.colors = [
            'rgba(251, 118, 123, 0.7)', 
            'rgba(129, 227, 238, 0.7)',
        ]
        //a variable size array of input courses
        this.series = []
        let i;
        const courses = this.props.courses;
        for (i = 0; i < courses.length; ++i) {
            const newobject = new BubbleObject(courses[i],
                this.props.data[i],
                {normal: {color: this.colors[i]}});
            this.series.push(newobject);
        }
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