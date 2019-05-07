import React from 'react';
const echarts = require('echarts/lib/echarts');

//require echarts component
require('echarts/lib/component/tooltip');
require('echarts/lib/component/title');
require('echarts/lib/component/visualMap');
require('echarts/lib/component/legend/LegendModel');
require('echarts/lib/chart/pie');
require('echarts/lib/chart/pie/labelLayout');
require('echarts/lib/chart/helper/labelHelper');

//simple style
const piedivstyle = {
    width: '100%',
    height: '100%'
}

const piestyle = {
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
class PieChart extends React.Component{
    constructor(props) {
        super(props);
        this.drawChart = this.drawChart.bind(this);
    }
    //function to call when component mounted
    componentDidMount() {
        this.drawChart();
    }

    drawChart = function() {
        let myChart = echarts.init(document.querySelector('.piediv'));
        //sort the hours predicted from smallest to biggest
        const mydata = this.props.data.sort((a, b) => {
            return a.value - b.value;
        });
        const myname = this.props.name;
        myChart.setOption({
            backgroundColor: '#2c343c',
            title: {
                text: myname,
                left: 'center',
                textStyle: {
                    color: 'rgb(255, 255, 255)'
                } //not working currently
            },
            tooltip: {},
            visualMap: [{
                min: 0,
                max: 30,
                left: '10%',
                bottom: '10%',
                inRange: {
                    colorLightness: [0.2, 1],
                },
                outOfRange: {
                    color: ['rgb(244, 78, 66)']
                },
                controller: {
                    inRange: {
                        color: ['#75abbc']
                    },
                    outOfRange: {
                        color: ['rgb(244, 78, 66)']
                    }
                }
            }],
            series: [{
                type: 'pie',
                radius: ['40%', '70%'],
                data: mydata,
                roseType: 'radius',
                itemStyle: {
                    normal: {
                        color: '#75abbc',
                        shadowBlur: 20,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                },
                label: {
                    normal: {
                        textStyle: {
                            color: 'rgb(255, 255, 255)'
                        }
                    }
                },
                labelLine: {
                    normal: {
                        lineStyle: {
                            color: 'rgb(255, 255, 255)'
                        },
                        smooth: 0.2,
                        length: 10,
                        length2: 20
                    }
                },
            }]
        });
    }
    render() {
        return (
        <div style={piedivstyle}>
            
            <div className="piediv" style={piestyle}>       
            </div>
            <span className="bubble" style={textStyle}> The big pie represents your workloads from all classes 
            The portion of the pie represent your specific workloads frome each class. </span>
        </div>
            

            
            
        )
    }
}

export default PieChart;