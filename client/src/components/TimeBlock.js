import React, { Component } from 'react'
import '../css/TimeBlock.css';
import TableContent from './TableContent'

class TimeBlock extends Component {
	constructor(){
		super();
		this.state={
			taskNum:3,
			taskName:'Task 2',
			taskEstimated:'1:30 Hrs',
			taskDuedate: '3/20/2019',
			taskList:[{taskName:'Task 1',taskEstimated:'1:30 Hrs', taskDuedate: '3/20/2019'},
			{taskName:'Task 2',taskEstimated:'1:30 Hrs', taskDuedate: '3/20/2019'},
			{taskName:'Task 3',taskEstimated:'1:30 Hrs', taskDuedate: '3/20/2019'}]
		}
		
	}
	//handle the event of changing the name and its targeted value
	handleNameChange = (event) =>{		
		this.setState({
			taskName:event.target.value

		})
	}
	//handle the event of changing the estiamted time and its targeted value
	handleEstimatedChange = (event) =>{
		this.setState({
			taskEstimated:event.target.value
		})
	}
	//handle the event of changing the Due Date and its targeted value
	handleDuedateChange = (event) =>{
		this.setState({
			taskDuedate:event.target.value
		})
	}
	//handle deletion of an existing event
	handleDelete = (i) =>{
		this.state.taskList.splice(i,1)
		this.setState({
			taskList:this.state.taskList,
			taskNum:this.state.taskNum-1
		})
			

	}
	//handle adding new event, user would have to enter 3 inputs in order to add a new event
	handleAddEvent = () =>{
		var taskNameInput = prompt("Please input the event name", "");
		var taskEstimatedInput = prompt("Please enter the estimated time", "");
		var taskDuedateInput = prompt("Please input the due date", "");


		
		let items = this.state.taskList
		items.push({taskName:taskNameInput+(this.state.taskNum+1),taskEstimated:taskEstimatedInput, taskDuedate: taskDuedateInput})
		this.setState({
			taskList:items,
			taskNum:this.state.taskNum+1
		})

	}
	// when done, the event would be put into the completed event box
	handleDone = (i) =>{
		var taski = this.state.taskList[i]
		var newTaskList = this.state.taskList
		newTaskList.splice(i,1)
		console.log(newTaskList)
		this.setState({
			taskList:newTaskList
		})

		this.props.handleDone(taski)
		
	}

	
	//this function is to locate the current editable value from the event name
	// and provide the new saved value not only for ongoing event but also for the completed event box when done.
	handleNameBlur = (i,TName) =>{
		var nList = this.state.taskList
		nList[i].taskName = TName
		this.setState({
			taskList:nList
		})

	}
	//this function is to locate the current editable value from the estimated name
	// and provide the new saved value not only for ongoing event but also for the completed event box when done.
	handleEstimatedBlur = (i,TEstimated) =>{
		var dList = this.state.taskList
		dList[i].taskEstimated = TEstimated
		this.setState({
			taskList:dList
		})
	}
	//this function is to locate the current editable value from the due date
	// and provide the new saved value not only for ongoing event but also for the completed event box when done.
	handleDuedateBlur = (i,TDuedate) =>{
		var dList = this.state.taskList
		dList[i].taskDuedate = TDuedate
		this.setState({
			taskList:dList
		})
	}

	



	render() {
		return (
		<table id = "tablelook">
			<thead>  
				<tr>					
					<th>Date: 3/10/2019</th> 
					<th>Estiamtion of time:</th>
					<th>Due Date:</th>
					<td>
					<button onClick={this.handleAddEvent}> Add New Event </button>
					</td>
					{/* <p id="demo"></p> */}

				</tr>
			</thead>
			<tbody>
				
				{this.state.taskList.map((task,i)=>
				<TableContent 
					handleNameChange={this.handleNameChange.bind(this,i)}
					handleEstimatedChange={this.handleEstimatedChange}
					handleDuedateChange={this.handleDuedateChange}
					
					tEstimated={task.taskEstimated}
					tName={task.taskName}
					tDuedate={task.taskDuedate}
					key={i}
					handleDelete={this.handleDelete.bind(this,i)}
					handleDone={this.handleDone.bind(this,i)}
					handleNameBlur={this.handleNameBlur.bind(this,i)}
					handleEstimatedBlur={this.handleEstimatedBlur.bind(this,i)}
					handleDuedateBlur={this.handleDuedateBlur.bind(this,i)}
				/>
				)}
				
			</tbody>
			<script>
			
			</script>
			
		</table>

		)
	}
}



export default TimeBlock;
