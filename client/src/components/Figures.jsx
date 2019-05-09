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
  {name: 'AIT', value: 7},
  {name: 'Graphics', value: 17}
];

//testing data
const mydata = [
    //input format: [day, hour, workload, hw name, course]
    [['Mon', 11, 4, 'Quiz', 'AIT'], 
    ['Mon', 11.6, 3, 'Quiz', 'AIT']],
    [['Wed', 6, 3, 'asssignment', 'Agile'],
    ['Sun', 7, 2, 'assignment', 'Agile'],
    ['Sat', 8, 2, 'assignment', 'Agile']],
    [['Tue', 23, 4, 'homework', 'Graphics'], 
    ['Mon', 20, 3, 'homework', 'Graphics'],
    ['Wed', 19, 4, 'homework', 'Graphics'], 
    ['Fri', 14, 7, 'homework', 'Graphics']]
  ];
  
  const mycourses = ['AIT', 'Agile', 'Graphics'];
  
  //figures to analysis a student's performance
  class Figures extends Component {

    render() {
      return (
        <div className="Figures" data-flickity='{ "wrapAround": true }' >
          <Barchart className='carousel-cell' xdata={['Agile', 'Quiz 6', 'Problem Set 5', 'homework', 'Budgets']}
              pdata={[5, 20, 30, 50, 20]} adata={[10, 20, 30, 45, 18]} name='Predicted vs. Actual'/>
          <LineChart className='carousel-cell' predTime={[0, 16, 19, 14, 15]}
              actualTime={[20, 21, 11, 18, 20]} name='Predicted vs. Actual'/>
          <BubbleChart className='carousel-cell' courses={mycourses} data={mydata} name='Finishing Time'/> 
          <PieChart className='carousel-cell' name='Predicted Intensity for Next Week' data={piedata}/>
        </div>
      );
    }
  }

  export default Figures;