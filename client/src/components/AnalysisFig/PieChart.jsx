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
const piestyle = {
    width: '100%',
    height: '100%'
}


//a line chart component to analyze the students predicted time vs. actual time
class PieChart extends React.Component{
    constructor(props) {
        super(props);
        this.drawChart = this.drawChart.bind(this);
        this.state = {
            schedules: {}
        };
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
        
        const last = {};
        const fut = {};
        const today = new Date();
        for(let i = 0; i < l1.length; ++i) {
            for(const hw of this.state.schedules[l1[i]]) {
                const course = hw.classname.length < 14 ? 
                    hw.classname : hw.classname.slice(0, 14);
                console.log(course);
                //assume time received format 2019-5-8T16:1
                const date = new Date(hw.duetime + ':00.000-04:00');
                const past = new Date();
                past.setDate(today.getDate() - 7);
                const future = new Date();
                future.setDate(today.getDate() + 7);
                //actual time should be non-zero if in past
                const dif = hw.difficulty;
                if(date > past && date < today) {
                    console.log(last[course]);
                    last[course] = last[course] !== undefined ? 
                        last[course] + hw.actualtime / dif : hw.actualtime / dif;
                } else if (date >= today && date < future){
                    fut[course] = fut[course] !== undefined ? fut[course] + dif : dif;
                }
            }
        }
        console.log(last);
        console.log(fut);
        for(const course of Object.keys(fut)) {
            if(last[course]) {
                const r = last[course];
                if(r !== 0) {
                    fut[course] *= r;
                }
            } else {
                fut[course] = 0;
            }
        }
        const piedata = [];
        for(const course of Object.keys(fut)) {
            const toadd = {name: '', value: 0};
            toadd.name = course;
            toadd.value = fut[course];
        }
        this.drawChart(piedata);
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

    drawChart = function(piedata) {
        let myChart = echarts.init(document.querySelector('.piediv'));
        //sort the hours predicted from smallest to biggest
        const mydata = piedata.sort((a, b) => {
            return a.value - b.value;
        });
        const myname = this.props.name;
        myChart.setOption({
            backgroundColor: '#fff',
            title: {
                text: myname,
                left: 'center',
                textStyle: {
                    color: '#2c343c'
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
                            color: '#2c343c'
                        }
                    }
                },
                labelLine: {
                    normal: {
                        lineStyle: {
                            color: '#2c343c'
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
            <div className="piediv" style={piestyle}>
            </div>
        )
    }
}

export default PieChart;