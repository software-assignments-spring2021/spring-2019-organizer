import React, { Component } from 'react'
import '../css/TimeBlock.css';
import TableContent from './TableContent'

class TimeBlock extends Component {
	constructor(){
		super();
		this.state={
			taskNum:3,
			taskName:'Task 2',
			taskDate:'1:30 Hrs',
			taskDuedate: '3/20/2019',
			taskList:[{taskName:'Task 1',taskDate:'1:30 Hrs', taskDuedate: '3/20/2019'},
			{taskName:'Task 2',taskDate:'1:30 Hrs', taskDuedate: '3/20/2019'},
			{taskName:'Task 3',taskDate:'1:30 Hrs', taskDuedate: '3/20/2019'}]
		}
		
	}

	handleNameChange = (event) =>{
		
		this.setState({
			taskName:event.target.value

		})
	}

	handleDateChange = (event) =>{
		this.setState({
			taskDate:event.target.value
		})
	}
	handleDateChange = (event) =>{
		this.setState({
			taskDuedate:event.target.value
		})
	}

	handleDelete = (i) =>{
		this.state.taskList.splice(i,1)
		this.setState({
			taskList:this.state.taskList,
			taskNum:this.state.taskNum-1
		})
			

	}

	handleAddEvent = () =>{
		
		let items = this.state.taskList
		items.push({taskName:'Task '+(this.state.taskNum+1),taskDate:'1:30 Hrs', taskDuedate: '3/20/2019'})
		this.setState({
			taskList:items,
			taskNum:this.state.taskNum+1
		})

	}

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

	

	handleNameBlur = (i,TName) =>{
		console.log(TName)
		var nList = this.state.taskList
		console.log(i)
		nList[i].taskName = TName
		this.setState({
			taskList:nList
		})

	}

	handleDateBlur = (i,TDate) =>{
		var dList = this.state.taskList
		dList[i].taskDate = TDate
		this.setState({
			taskList:dList
		})
	}

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
					<th>Dates: 3/10/2019</th> 
					<th>Estiamtion of time:</th>
					<th>Due Date:</th>
					<button onClick={this.handleAddEvent}> Add New Event </button>
					<p id="demo"></p>

				</tr>
			</thead>
			<tbody>
				
				{this.state.taskList.map((task,i)=>
				<TableContent 
					handleNameChange={this.handleNameChange.bind(this,i)}
					handleDateChange={this.handleDateChange}
					handleDuedateChange={this.handleDuedateChange}
					
					tDate={task.taskDate}
					tName={task.taskName}
					tDuedate={task.taskDuedate}
					key={i}
					handleDelete={this.handleDelete.bind(this,i)}
					handleDone={this.handleDone.bind(this,i)}
					handleNameBlur={this.handleNameBlur.bind(this,i)}
					handleDateBlur={this.handleDateBlur.bind(this,i)}
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


// import React, { Component } from 'react'
// import Button from 'react-bootstrap/Button';
// // import FaPencil from 'react-icons/lib/fa/pencil'
// // import FaTrash from 'react-icons/lib/fa/trash'

// class Note extends Component {
// 	constructor(props) {
// 		super(props)
// 		this.edit = this.edit.bind(this)
// 		this.remove = this.remove.bind(this)
// 	}
// 	edit() {
// 		alert('editing note')
// 	}
// 	remove() {
// 		alert('removing note')
// 	}
// 	render() {
// 		return (
// 			<div className="note">
// 				<p>Learn React</p>
// 				<span>
// 					{/* <button onClick={this.edit} id="edit"><FaPencil /></button>*/} */}
// 					{/* {/*<button onClick={this.remove} id="remove"><FaTrash /></button> */}
// 				</span>
// 			</div>
// 		)
// 	}
// }

// export default Note