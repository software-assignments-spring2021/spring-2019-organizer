import React from 'react';
const d3 = require('d3');

//simple style for the liquid gauge
const style = {
    position: 'absolute',
    left: '88%',
    marginTop: '2%'
}

class LiquidGauge extends React.Component {
    constructor(props) {
        super(props);
        this.loadDefault = this.loadDefault.bind(this);
        this.pred = this.pred.bind(this);
        this.state = {
            schedules: {}
        };
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
            this.setState({ schedules: this.sortByDate(newSchedules) });
            this.loadLiquidGauge('stress', this.pred(), this.props.text);
        }).catch((err) => {
            console.log(err);
        });
    }

    pred() {
        const l1 = [];
        const l2 = [];
        const l = [];
        for(const key of Object.keys(this.state.schedules)){
            console.log(key + 'T00:00:00.000-04:00');
            l2.push(new Date(key + 'T00:00:00.000-04:00'));
            l1.push(key);
        }
        const f = new Date();
        let j = 0;
        while(l2[j] < f) {
            ++j;
        }
        for(let i = 0; i < 7; ++i) {
            if(l2[j].toDateString() === f.toDateString()) {
                l.push(l1[j]);
                ++j;
            }
            f.setDate(f.getDate() + 1);
        }
        //workload computation
        let wl = 0;
        //console.log(l);
        for(const d of l) {
            for(const li of this.state.schedules[d]) {
                wl += li.predictiontime;
            }
        }
        console.log(wl);
        return wl;
    }
    

    loadDefault = function(value) {
        //adding linear scaler to change the color based on the stress level
        const ls = d3.scaleLinear()
            .domain([0, 20, 40, 60, 80, 100])
            .range(['#91C4F2', '#8CA0D7', '#9D79BC', '#A14DA0', '#7E1F86']);
        
        return {
            minValue: 0, // The gauge minimum value.
            maxValue: 100, // The gauge maximum value.
            circleThickness: 0.05, // The outer circle thickness as a percentage of it's radius.
            circleFillGap: 0.05, // The size of the gap between the outer circle and wave circle as a percentage of the outer circles radius.
            circleColor: "rgb(68, 0, 121)", // The color of the outer circle.
            waveHeight: 0.05, // The wave height as a percentage of the radius of the wave circle.
            waveCount: 1, // The number of full waves per width of the wave circle.
            waveRiseTime: 1000, // The amount of time in milliseconds for the wave to rise from 0 to it's final height.
            waveAnimateTime: 1800, // The amount of time in milliseconds for a full wave to enter the wave circle.
            waveRise: true, // Control if the wave should rise from 0 to it's full height, or start at it's full height.
            waveHeightScaling: true, // Controls wave size scaling at low and high fill percentages. When true, wave height reaches it's maximum at 50% fill, and minimum at 0% and 100% fill. This helps to prevent the wave from making the wave circle from appear totally full or empty when near it's minimum or maximum fill.
            waveAnimate: true, // Controls if the wave scrolls or is static.
            waveColor: ls(value), // The color of the fill wave.
            waveOffset: 0, // The amount to initially offset the wave. 0 = no offset. 1 = offset of one full wave.
            textVertPosition: .5, // The height at which to display the percentage text withing the wave circle. 0 = bottom, 1 = top.
            textSize: 1, // The relative height of the text to display in the wave circle. 1 = 50%
            valueCountUp: true, // If true, the displayed value counts up from 0 to it's final value upon loading. If false, the final value is displayed.
            displayPercent: false, // If true, a % symbol is displayed after the value.
            textColor: "#2E0C31", // The color of the value text when the wave does not overlap it.
            waveTextColor: "#A4DBf8" // The color of the value text when the wave overlaps it.
        };
    }

    sortByDate(unordered) {
        const ordered = {};
    
        Object.keys(unordered).sort().forEach(function(key) {
          ordered[key] = unordered[key];
        });
    
        return ordered;
      }

    loadLiquidGauge(eleid, value, text, myconfig) {
        const config = myconfig || this.loadDefault(value);
        const gauge = d3.select('#' + eleid);
        //console.log(value);
        const radius = Math.min(parseInt(gauge.style("width")),
            parseInt(gauge.style("height"))) / 2;
        let locationX = parseInt(gauge.style("width")) / 2 - radius;
        let locationY = parseInt(gauge.style("height")) / 2 - radius;
        const fillPercent = Math.max(config.minValue, 
            Math.min(config.maxValue, value)) / config.maxValue;
        let lscaler = null;
        if(config.waveHeightScaling){
            lscaler = d3.scaleLinear()
                .range([0,config.waveHeight,0])
                .domain([0,50,100]);
        } else {
            lscaler = d3.scaleLinear()
                .range([config.waveHeight,config.waveHeight])
                .domain([0,100]);
        }

        const textPixels = (config.textSize*radius/2);
        const textFinalValue = parseFloat(value).toFixed(2);
        const textStartValue = config.valueCountUp ? 
            config.minValue : textFinalValue;
        const percentText = config.displayPercent ? 
            "%" : "";
        const circleThickness = config.circleThickness * radius;
        const circleFillGap = config.circleFillGap * radius;
        const fillCircleMargin = circleThickness + circleFillGap;
        const fillCircleRadius = radius - fillCircleMargin;
        const waveHeight = fillCircleRadius * lscaler(fillPercent*100);

        const waveLength = fillCircleRadius*2 / config.waveCount;
        const waveClipCount = 1+config.waveCount;
        const waveClipWidth = waveLength * waveClipCount;

        // Rounding functions so that the correct number of decimal places is always displayed as the value counts up.
        let textRounder = function(value){ return Math.round(value); };
        if(parseFloat(textFinalValue) !== parseFloat(textRounder(textFinalValue))){
            textRounder = function(value){ return parseFloat(value).toFixed(1); };
        }
        if(parseFloat(textFinalValue) !== parseFloat(textRounder(textFinalValue))){
            textRounder = function(value){ return parseFloat(value).toFixed(2); };
        }

        // Data for building the clip wave area.
        const data = [];
        for(let i = 0; i <= 40*waveClipCount; ++i){
            data.push({x: i/(40*waveClipCount), y: (i/(40))});
        }

        // Scales for drawing the outer circle.
        const gaugeCircleX = d3.scaleLinear().range([0,2*Math.PI]).domain([0,1]);
        const gaugeCircleY = d3.scaleLinear().range([0,radius]).domain([0,radius]);

        // Scales for controlling the size of the clipping path.
        const waveScaleX = d3.scaleLinear().range([0,waveClipWidth]).domain([0,1]);
        const waveScaleY = d3.scaleLinear().range([0,waveHeight]).domain([0,1]);

        // Scales for controlling the position of the clipping path.
        const waveRiseScale = d3.scaleLinear()
            // The clipping area size is the height of the fill circle + the wave height, so we position the clip wave
            // such that the it will overlap the fill circle at all when at 0%, and will totally cover the fill
            // circle at 100%.
            .range([(fillCircleMargin+fillCircleRadius*2+waveHeight),(fillCircleMargin-waveHeight)])
            .domain([0,1]);
        const waveAnimateScale = d3.scaleLinear()
            .range([0, waveClipWidth-fillCircleRadius*2]) // Push the clip area one full wave then snap back.
            .domain([0,1]);

        // Scale for controlling the position of the text within the gauge.
        const textRiseScaleY = d3.scaleLinear()
            .range([fillCircleMargin+fillCircleRadius*2,(fillCircleMargin+textPixels*0.7)])
            .domain([0,1]);

        // Center the gauge within the parent SVG.
        const gaugeGroup = gauge.append("g")
            .attr('transform','translate('+locationX+','+locationY+')');

        // Draw the outer circle.
        const gaugeCircleArc = d3.arc()
            .startAngle(gaugeCircleX(0))
            .endAngle(gaugeCircleX(1))
            .outerRadius(gaugeCircleY(radius))
            .innerRadius(gaugeCircleY(radius-circleThickness));
        
        gaugeGroup.append("path")
            .attr("d", gaugeCircleArc)
            .style("fill", config.circleColor)
            .attr('transform','translate('+radius+','+radius+')');

        // Text where the wave does not overlap.
        let text1;
        if(text) {
            text1 = gaugeGroup.append("text")
                .text(textRounder(textStartValue) + percentText)
                .attr("class", "liquidFillGaugeText")
                .attr("text-anchor", "middle")
                .attr("font-size", textPixels + "px")
                .style("fill", config.textColor)
                .attr('transform','translate('+radius+','+textRiseScaleY(config.textVertPosition)+')');
        }

        // The clipping wave area.
        const clipArea = d3.area()
            .x(function(d) { return waveScaleX(d.x); } )
            .y0(function(d) { return waveScaleY(Math.sin(Math.PI * 2 * config.waveOffset * - 1 + 
                Math.PI * 2 * (1 - config.waveCount) + d.y * 2 * Math.PI));} )
            .y1(function(d) { return (fillCircleRadius * 2 + waveHeight); } );
        const waveGroup = gaugeGroup.append("defs")
            .append("clipPath")
            .attr("id", "clipWave" + eleid);
        const wave = waveGroup.append("path")
            .datum(data)
            .attr("d", clipArea)
            .attr("T", 0);

        // The inner circle with the clipping wave attached.
        const fillCircleGroup = gaugeGroup.append("g")
            .attr("clip-path", "url(#clipWave" + eleid + ")");
        fillCircleGroup.append("circle")
            .attr("cx", radius)
            .attr("cy", radius)
            .attr("r", fillCircleRadius)
            .style("fill", config.waveColor);

        // Text where the wave does overlap.
        let text2 = null;
        if(text) {
        text2 = fillCircleGroup.append("text")
            .text(textRounder(textStartValue) + percentText)
            .attr("class", "liquidFillGaugeText")
            .attr("text-anchor", "middle")
            .attr("font-size", textPixels + "px")
            .style("fill", config.waveTextColor)
            .attr('transform','translate('+radius+','+textRiseScaleY(config.textVertPosition)+')');
        }
        // Make the value count up.
        if(config.valueCountUp){
            const textTween = function(){
                const i = d3.interpolate(this.textContent, textFinalValue);
                return function(t) { this.textContent = textRounder(i(t)) + percentText; }
            };
            if(text) {
            text1.transition()
                .duration(config.waveRiseTime)
                .tween("text", textTween);
            text2.transition()
                .duration(config.waveRiseTime)
                .tween("text", textTween);
            }
        }

        // Make the wave rise. wave and waveGroup are separate so that horizontal and vertical movement can be controlled independently.
        const waveGroupXPosition = fillCircleMargin + 
            fillCircleRadius * 2 - waveClipWidth;
        if(config.waveRise){
            waveGroup.attr('transform','translate(' + waveGroupXPosition + ',' + waveRiseScale(0) + ')')
                .transition()
                .duration(config.waveRiseTime)
                .attr('transform','translate('+waveGroupXPosition+','+waveRiseScale(fillPercent)+')')
                .on("start", function(){ wave.attr('transform','translate(1,0)'); }); 
                // This transform is necessary to get the clip wave positioned correctly when waveRise=true and waveAnimate=false. The wave will not position correctly without this, but it's not clear why this is actually necessary.
        } else {
            waveGroup.attr('transform','translate('+waveGroupXPosition+','+waveRiseScale(fillPercent)+')');
        }

        if(config.waveAnimate) animateWave();

        function animateWave() {
            wave.attr('transform','translate('+waveAnimateScale(wave.attr('T'))+',0)');
            wave.transition()
                .duration(config.waveAnimateTime * (1-wave.attr('T')))
                .ease(d3.easeLinear)
                .attr('transform','translate('+waveAnimateScale(1)+',0)')
                .attr('T', 1)
                .on('end', function(){
                    wave.attr('T', 0);
                    animateWave(config.waveAnimateTime);
                });
        }
    }

    render() {
        return (
            <svg id='stress' width='70' height='70' style={style}></svg>
        )
    }
}

export default LiquidGauge;