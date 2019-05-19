import React from 'react';
const echarts = require('echarts/lib/echarts');

//require echarts component
require('echarts/lib/component/tooltip');
require('echarts/lib/component/title');
require('echarts/lib/chart/line');

const style = {
    width: '100%',
    height: '100%'
}

const lineStyle = {
    height: '90%'
}

const textStyle = {
    fontFamily: 'Roboto Mono, monospace',
    fontSize: '10pt'
}

//a line chart component to analyze the students predicted time vs. actual time
class LineChart extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            schedules: {}
        };
        this.drawChart = this.drawChart.bind(this);
    }
    //function to call when component mounted
    componentDidMount() {
        const urls = ['/schedule', '/class'];
        Promise.all(urls.map(u=>fetch(u)))
        .then(responses =>
        Promise.all(responses.map(res => res.json()))
        )
        .then(texts => {
        let newSchedules = {};
        for (const obj of texts[0]) {
            const due = obj.duetime.slice(0,10);
            let class_name;
            for (const class_obj of texts[1]) {
            if (class_obj._id === obj.class)
                class_name = class_obj.name;
            }
            obj.classname = class_name;
            if (newSchedules.hasOwnProperty(due)) {
                newSchedules[due].push(obj);
            } else {
                newSchedules[due] = [obj];
            }
        }
        this.setState({ schedules: this.sortByDate(newSchedules)});
        const l1 = [];
        const l2 = [];
        for(const key of Object.keys(this.state.schedules)){
            l2.push(new Date(key + 'T00:00:00.000-04:00'));
            l1.push(key);
        }
        let f = new Date();
        f.setDate(f.getDate() - 1);
        const xdata = this.getXdata(f);
        let j = 0;
        const past = [];
        while(l2[j] < f && j < l2.length) {
            past.push(l1[j]);
            j += 1;
        }
        if(l2[j] > f) {
            --j;
        }
        const y1data = [];
        const y2data = [];
        for(let i = 0; i < 5; ++i) {
            console.log(l2[j].toDateString())
            console.log(f.toDateString());
            if(j >= 0 && l2[j].toDateString() === f.toDateString()) {
                const mydata = this.getPAdata(this.state.schedules[l1[j]]);
                console.log(mydata);
                y1data.push(mydata[0]);
                y2data.push(mydata[1]);
                --j;
            } else {
                y1data.push(5);
                y2data.push(5);
            }
            f.setDate(f.getDate() - 1);
        }
        this.drawChart(xdata, y1data.reverse(), y2data.reverse());
    }).catch((err) => {
        console.log(err);
    });
    }

    //to get predicted and actual time
    getPAdata(l) {
        let tp = 0;
        let ta = 0;
        for(const hw of l) {
            tp += hw.predictiontime;
            ta += hw.actualtime;
        }
        return [tp, ta];
    }

    getXdata(date) {
        let toReturn = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', {
            value: 'Sat', textStyle: {
            fontSize: 15,
            color: 'red'
        }}, 'Sun'];
        const day = date.toDateString().slice(0, 3);
        if(day === 'Mon') {
            toReturn = ['Thu', 'Fri', 'Sat', 'Sun', 'Mon', {
                value: 'Tue', textStyle: {
                fontSize: 15,
                color: 'red'
            }}, 'Wed'];
        } else if(day === 'Tue') {
            toReturn = ['Fri', 'Sat', 'Sun', 'Mon', 'Tue', {
                value: 'Wed', textStyle: {
                fontSize: 15,
                color: 'red'
            }}, 'Thu'];
        } else if(day === 'Wed') {
            toReturn = ['Sat', 'Sun', 'Mon', 'Tue', 'Wed', {
                value: 'Thu', textStyle: {
                fontSize: 15,
                color: 'red'
            }}, 'Fri'];
        } else if(day === 'Thu') {
            toReturn = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', {
                value: 'Fri', textStyle: {
                fontSize: 15,
                color: 'red'
            }}, 'Sat'];
        } else if(day === 'Sat') {
            toReturn = ['Tue', 'Wed', 'Thu', 'Fri', 'Sat', {
                value: 'Sun', textStyle: {
                fontSize: 15,
                color: 'red'
            }}, 'Mon'];
        } else if(day === 'Sun') {
            toReturn = ['Wed', 'Thu', 'Fri', 'Sat', 'Sun', {
                value: 'Mon', textStyle: {
                fontSize: 15,
                color: 'red'
            }}, 'Tue'];
        }
        return toReturn;
    }

    sortByDate(unordered) {
        const ordered = {};

        Object.keys(unordered).sort().forEach(function(key) {
            ordered[key] = unordered[key];
        });

        return ordered;
    }

    drawChart = function(xdata, predTime, actualTime) {
        let myChart = echarts.init(document.querySelector('.linediv'));
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
                data: xdata
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
            <div style={style}>
            <div className="linediv" style={lineStyle}>
            </div>
            <div className='textDiv' style={textStyle}>
            This chart shows the differences between the user-predicted time and 
            the actual time spent in the most recent week.
            </div>
            </div>
        )
    }
}

export default LineChart;