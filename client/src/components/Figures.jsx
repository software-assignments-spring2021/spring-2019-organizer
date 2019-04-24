import Barchart from './AnalysisFig/Barchart';
import LineChart from './AnalysisFig/LineChart';
import BubbleChart from './AnalysisFig/BubbleChart';
import PieChart from './AnalysisFig/PieChart';
import React, { Component } from 'react';

//sample test data:
const piedata = [
  {name: 'Agile', value: 12},//value in hour
  {name: 'Operating System', value: 7},
  {name: 'Machine Learning', value: 17}
]

//testing data
const mydata = [
    //input format: [day, hour, workload, hw name, course]
    [[1, 11, 4, 'lab1', 'Operating Systems'], 
    [1, 11.6, 3, 'lab2', 'Operating Systems']],
    [[3, 6, 3, 'quiz', 'Agile'],
    [7, 7, 2, 'quiz', 'Agile']]
  ];
  
  const mycourses = ['Operating Systems', 'Agile'];
  
  //figures to analysis a student's performance
  class Figures extends Component {
    render() {
      return (
        <div className="Figures">
        <Barchart xdata={['hw1', 'hw2', 'hw3', 'hw4', 'hw5']}
            ydata={[5, 20, 30, 50, 20]} name='Example'/>
        <LineChart predTime={[0, 16, 19, 14, 15]}
            actualTime={[20, 21, 11, 18, 20]}/>
        <BubbleChart courses={mycourses} data={mydata} name='bubblechart'/> 
        <PieChart name='pie chart' data={piedata}/>
        </div>
      );
    }
  }

  export default Figures;