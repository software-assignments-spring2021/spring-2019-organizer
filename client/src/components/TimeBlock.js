import React, { Component } from 'react';
import { Card, Row, Col, Button } from 'react-bootstrap';
import TableContent from './TableContent';
import '../css/TimeBlock.css';

class TimeBlock extends Component {
  constructor(props){
		super();
		this.state={
			scheduleDate: props.date,
			estimatedTime: props.estimatedTime,
			taskNum: 3,
			taskList: props.taskList
		};
	}

	// handle the event of changing the name and its targeted value
  handleNameChange = (event) =>{
		this.setState({
			taskName:event.target.value
    });
  }

  // handle the event of changing the estiamted time and its targeted value
	handleEstimatedChange = (event) =>{
		this.setState({
			taskEstimated:event.target.value
		});
	}
	
	// handle the event of changing the Due Date and its targeted value
	handleDuedateChange = (event) =>{
		this.setState({
			taskDuedate:event.target.value
		});
	}

	// handle deletion of an existing event
  handleDelete = (i) =>{
		this.state.taskList.splice(i,1);
		this.setState({
			taskList:this.state.taskList,
			taskNum:this.state.taskNum-1
		});
  }

	// handle adding new event, user would have to enter 3 inputs in order to add a new event
  handleAddEvent = () =>{
		var taskNameInput = prompt("Please input the event name", "");
		var taskEstimatedInput = prompt("Please enter the estimated time", "");
		var taskDuedateInput = prompt("Please input the due date", "");

		let items = this.state.taskList;
		items.push({taskName:taskNameInput, taskEstimated:taskEstimatedInput, taskDuedate: taskDuedateInput});
		this.setState({
			taskList:items,
			taskNum:this.state.taskNum+1
		});

		fetch('/schedules', { method: 'POST' })
		.then(res => res.json())
		.then(json => {
			const data = {};
			data.push(json);
			this.setState({
				schedules: data
			});
		});
  }

	// when done, the event would be put into the completed event box
  handleDone = (i) => {
		var taski = this.state.taskList[i];
		var newTaskList = this.state.taskList;
		newTaskList.splice(i,1);
		this.setState({
			taskList:newTaskList
		});
    this.props.handleDone(taski);
  }

	// this function is to locate the current editable value from the event name
	// and provide the new saved value not only for ongoing event 
	// but also for the completed event box when done.
  handleNameBlur = (i,TName) => {
		var nList = this.state.taskList;
		nList[i].taskName = TName;
		this.setState({
			taskList:nList
		});
  }

	// this function is to locate the current editable value from the estimated name
	// and provide the new saved value not only for ongoing event 
	// but also for the completed event box when done.
  handleEstimatedBlur = (i,TEstimated) =>{
		var dList = this.state.taskList
		dList[i].taskEstimated = TEstimated
		this.setState({
			taskList:dList
		})
	}

	// this function is to locate the current editable value from the due date
	// and provide the new saved value not only for ongoing event 
	// but also for the completed event box when done.
  handleDuedateBlur = (i,TDuedate) => {
		var dList = this.state.taskList;
    dList[i].taskDuedate = TDuedate;
		this.setState({
	  	taskList:dList
		});
  }

  render() {
		return (
			<Card id = "cardlook">
				<Card.Header as="h5">
					<Row>
						<Col>{this.state.scheduleDate}</Col>
						<Col>Estimated Time: {this.state.estimatedTime}</Col>
					</Row>
				</Card.Header>

				<Card.Body>
					<Card.Title>
						<Row>
							<Col>Required</Col>
							<Col>Estimated Time</Col>
							<Col>Due</Col>
							<Col> 
								<Button onClick={this.handleAddEvent}> Add New Event</Button>
							</Col>
						</Row>
					</Card.Title>
					{this.state.taskList.map((task,i)=>
						<TableContent 
							handleNameChange={this.handleNameChange.bind(this,i)}
							handleDateChange={this.handleDateChange}
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
				</Card.Body>

			</Card>
		)
  }
}

export default TimeBlock;