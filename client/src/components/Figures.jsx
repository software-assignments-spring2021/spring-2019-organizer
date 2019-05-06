import Barchart from './AnalysisFig/Barchart';
import LineChart from './AnalysisFig/LineChart';
import BubbleChart from './AnalysisFig/BubbleChart';
import PieChart from './AnalysisFig/PieChart';
import React, { Component } from 'react';
import '../css/Figurecell.css';
require('flickity');

//sample test data:
const piedata = [
  {name: 'Agile', value: 12},//value in hour
  {name: 'Operating System', value: 7},
  {name: 'Machine Learning', value: 17}
];

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
    componentDidMount() {
      // const group = document.querySelector('.Figures').children;
      // console.log(group)
      // for(const ele of group) {
      //   new flickity( ele, {
      //     cellAlign: 'left',
      //     contain: true
      //   }
      //   )
      // }
    }

    render() {
      return (
        <div className="Figures" data-flickity='{ "wrapAround": true }' >
          <Barchart className='carousel-cell' xdata={['hw1', 'hw2', 'hw3', 'hw4', 'hw5']}
              pdata={[5, 20, 30, 50, 20]} adata={[10, 20, 30, 45, 18]} name='Example'/>
          <LineChart className='carousel-cell' predTime={[0, 16, 19, 14, 15]}
              actualTime={[20, 21, 11, 18, 20]}/>
          <BubbleChart className='carousel-cell' courses={mycourses} data={mydata} name='bubblechart'/> 
          <PieChart className='carousel-cell' name='pie chart' data={piedata}/>
        </div>
      );
    }
  }

  export default Figures;