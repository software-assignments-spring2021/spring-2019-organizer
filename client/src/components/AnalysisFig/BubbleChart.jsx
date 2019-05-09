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
        this.update = this.update.bind(this);
        this.state = {
            schedules: {}
        };
    }

    update(courses, info) {
        //a limited number of color options
        const colors = [
            'rgba(251, 118, 123, 0.7)', 
            'rgba(129, 227, 238, 0.7)',
            'rgba(207, 68, 114, 0.7)',
            'rgba(244, 66, 137, 0.8)',
            'rgba(163, 65, 244, 0.7)',
            'rgba(72, 201, 145, 0.6)'
        ];
        const series = [];
        let i;
        for (i = 0; i < courses.length; ++i) {
            const newobject = new BubbleObject(courses[i],
                info.data[i],
                {normal: {color: colors[i]}});
            series.push(newobject);
        }
        return series;
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
        console.log(this.state.schedules);
        const l1 = [];
        const l2 = [];
        for(const key of Object.keys(this.state.schedules)){
            l2.push(new Date(key + 'T00:00:00.000-04:00'));
            l1.push(key);
        }
        const info = {};
        for(let i = 0; i < l1.length; ++i) {
            for(const hw of this.state.schedules[l1[i]]) {
                console.log(hw);
                if(hw.finishtime.length > 0) {
                    const course = hw.classname.length < 14 ? 
                        hw.classname : hw.classname.slice(0, 14);
                    //assume time received format 2019-5-8T16:1
                    const date = new Date(hw.finishtime + ':00.000-04:00');
                    const hour = date.getHours();
                    const day = date.toDateString().slice(0, 3);
                    const dif = hw.difficulty * hw.actualtime / 1.4;
                    if(!info[course]) {
                        info[course] = [[day, hour, dif, hw.name, course]];
                    } else {
                        info[course].push([day, hour, dif, hw.name, course]);
                    }
                }
            }
        }
        this.drawChart(this.update(Object.keys(info), Object.values(info)), 
            Object.keys(info));
        }).catch((err) => {
            console.log(err);
        });
    }

    sortByDate(unordered) {
        const ordered = {};
        Object.keys(unordered).sort().forEach(function(key) {
            ordered[key] = unordered[key];
        });
        return ordered;
    }

    drawChart = function(myseries, mylegend) {
        let myChart = echarts.init(document.querySelector('.bubblediv'));
        const name = this.props.name;
        // const myseries = this.series;
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
                },
                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
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