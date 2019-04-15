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
							subject={task.class}
							key={i}
							handleDelete={this.handleDelete.bind(this,i)}
							handleDone={this.handleDone.bind(this,i)}
						/>
					)}
				</Card.Body>

			</Card>
		)
  }
}

export default TimeBlock;