import React, { Component } from 'react'
import '../css/TimeBlock.css';
import FixedTable from './FixedTable';

class CompleteTable extends Component{
    

    render() {
		return (
		<table id = "tcomplete">
			<thead>  
				<tr>					
					<th>Dates: 3/10/2019</th> 
					<th>Estiamtion of time:</th>
					<th>Due Date:</th>
					<p id="demo"></p>

				</tr>
			</thead>

			<tbody>
                {this.props.fixedList.map((item,i)=>
				<FixedTable 
                    fName={item.taskName}
					fDate={item.taskDate}
					fDuedate={item.taskDuedate}
                    key={i}
                />
				)}
				
			</tbody>
			<script>
			
			</script>
			
		</table>

		)
	}
}

export default CompleteTable;