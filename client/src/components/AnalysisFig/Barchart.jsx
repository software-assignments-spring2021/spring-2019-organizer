import React from 'react';
const echarts = require('echarts/lib/echarts');

//require echarts component
require('echarts/lib/component/tooltip');
require('echarts/lib/component/title');
require('echarts/lib/chart/bar');
require('echarts/lib/component/legend');

const barStyle = {
    width: '100%',
    height: '100%'
}

//a bar chart component
class Barchart extends React.Component{
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
            console.log(this.state.schedules);
            const l1 = [];
            const l2 = [];
            for(const key of Object.keys(this.state.schedules)){
                console.log(key + 'T00:00:00.000-04:00');
                l2.push(new Date(key + 'T00:00:00.000-04:00'));
                l1.push(key);
            }
            const xdata = [];
            const y1data = [];
            const y2data = [];
            let num = 0;
            for(const date of l1) {
                const hws = this.state.schedules[date];
                console.log(hws);
                for(const hw of hws) {
                    if(hw.actualtime !== 0) {
                        let course;
                        let hwname;
                        course = hw.classname.length > 4 ? 
                            (hw.classname.slice(0, 4)  + '..') : hw.classname;
                        hwname = hw.name > 7 ? hw.name.slice(0, 4) : hw.name;
                        xdata.push(course + ' ' + hwname);
                        y1data.push(hw.predictiontime);
                        y2data.push(hw.actualtime);
                        ++num;
                        if(num >= 7) {
                            break;
                        }
                    }
                }
                if(num >= 7) {
                    break;
                }
            }
            console.log(xdata);
            console.log(y1data);
            console.log(y2data);
            this.drawChart(xdata, y1data, y2data);

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

    drawChart = function(xdata, y1data, y2data) {
        let myChart = echarts.init(document.querySelector('.chartdiv'));
        const name = this.props.name;
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
            <div className="chartdiv" style={barStyle}>
            </div>
        )
    }
}

export default Barchart;