import React, { Component } from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import TableContent from './TableContent';
import Change from './Change';
import '../css/TimeBlock.css';

class TimeBlock extends Component {
  constructor(props){
		super();
		this.state={
			date: props.date,
			tasks: props.tasks
		};
	}

	// handle deletion of an existing event
  handleDelete = (i) =>{
		this.state.tasks.splice(i,1);
		this.setState({
			tasks:this.state.tasks
		});
  }

  handleAddEvent = () =>{
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
		var taski = this.state.tasks[i];
		var newtasks = this.state.tasks;
		newtasks.splice(i,1);
		this.setState({
			tasks:newtasks
		});
    this.props.handleDone(taski);
  }

	// this function is to locate the current editable value from the event name
	// and provide the new saved value not only for ongoing event 
	// but also for the completed event box when done.
  handleNameBlur = (i,TName) => {
		var nList = this.state.tasks;
		nList[i].taskName = TName;
		this.setState({
			tasks:nList
		});
  }

	// this function is to locate the current editable value from the estimated name
	// and provide the new saved value not only for ongoing event 
	// but also for the completed event box when done.
  handleEstimatedBlur = (i,TEstimated) =>{
		var dList = this.state.tasks
		dList[i].taskEstimated = TEstimated
		this.setState({
			tasks:dList
		})
	}

	// this function is to locate the current editable value from the due date
	// and provide the new saved value not only for ongoing event 
	// but also for the completed event box when done.
  handleDuedateBlur = (i,TDuedate) => {
		var dList = this.state.tasks;
    dList[i].taskDuedate = TDuedate;
		this.setState({
	  	tasks:dList
		});
  }

  render() {
		return (
			<Card id="cardlook" className="text-left">
				<Card.Header as="h5">
					{this.state.date}
				</Card.Header>

				<Card.Body>
					<Card.Title>
						<Row>
							<Col>Subject</Col>
							<Col>Required</Col>
							<Col>Estimated Time</Col>
							<Col> 
								<Change task={null}/>
							</Col>
						</Row>
					</Card.Title>
					{this.state.tasks.map((task,i)=>
						<TableContent 
							task={task}
							estimated={task.estimated}
							name={task.name}
							subject={task.subject}
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