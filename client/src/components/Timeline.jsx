import React from 'react';
import Dot from './Dot';
import '../css/Timeline.css';
require('flickity');

//credit: codepen user Anders Grimsrud
class Timeline extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            schedules: {}
        };
        this.dots = [];
        for(let i = 0; i < 14; ++i) {
            this.dots.push(React.createRef());
        }
    }

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
      const f = l2[0];
      let j = 0;
    for(let i = 0; i < 14; ++i) {
        // console.log(l2[j].toDateString());
        // console.log(f.toDateString());
        if(l2[j].toDateString() === f.toDateString()) {
            this.dots[i].current.update(l2[j].toDateString(), 
                this.gethwtext(this.state.schedules[l1[j]]));
            ++j;
        } else {
            this.dots[i].current.update('', 'enjoy your day off');
        }
        f.setDate(f.getDate() + 1);
    }
    }).catch((err) => {
      console.log(err);
    });
    }

    gethwtext(hwarr) {
        let text = '';
        for(const obj of hwarr) {
            text += obj['classname'] + ': ' + obj['name'] + '\r\n'; 
        }
        console.log(text);
        return text;
    }

    sortByDate(unordered) {
        const ordered = {};
    
        Object.keys(unordered).sort().forEach(function(key) {
          ordered[key] = unordered[key];
        });
    
        return ordered;
      }

    render() {
    return (
        <div className="lineDiv">
        <div className="line"></div>
        <div className="Timeline" data-flickity='{ 
         "groupCells": 2, "cellAlign": "left", "setGallerySize": false,
         "fade": true }'>
            <Dot ref={this.dots[0]}/>
            <Dot ref={this.dots[1]}/>
            <Dot ref={this.dots[2]}/>
            <Dot ref={this.dots[3]}/>
            <Dot ref={this.dots[4]}/>
            <Dot ref={this.dots[5]}/>
            <Dot ref={this.dots[6]}/>
            <Dot ref={this.dots[7]}/>
            <Dot ref={this.dots[8]}/>
            <Dot ref={this.dots[9]}/>
            <Dot ref={this.dots[10]}/>
            <Dot ref={this.dots[11]}/>
            <Dot ref={this.dots[12]}/>
            <Dot ref={this.dots[13]}/>
        </div>
        </div>
    );
    }
}

export default Timeline;