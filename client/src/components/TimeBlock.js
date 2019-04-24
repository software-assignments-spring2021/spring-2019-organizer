import React, { Component } from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import TableContent from './TableContent';
import Change from './Change';
import '../css/TimeBlock.css';

class TimeBlock extends Component {
  constructor(props){
		super();

    this.handleSave = this.handleSave.bind(this);

		this.state={
			date: props.date,
			tasks: props.tasks
		};
	}

  handleDelete = (i) => {
		if (this.state.tasks.length === 1) this.props.handleDelete();
		else {
			this.state.tasks.splice(i,1);
			this.setState({
				tasks:this.state.tasks
			});
		}

		fetch('/task', {
      method: 'DELETE',
      body: JSON.stringify({taskid: 'somestring'}), // set taskid
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(res => res.json())
		.then((data) => console.log(data))
    .catch((err)=>console.log(err))
	}
	
	handleUpdate(i, undateInfo) {
		if (this.state.tasks.length === 1) this.props.handleDelete();
		else {
			this.state.tasks.splice(i,1);
			this.setState({
				tasks:this.state.tasks
			});
		}

    this.props.handleUpdate(i, undateInfo);
  }

  handleSave(saveInfo) {
    this.props.handleSave(saveInfo);
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
							<Col>Tags</Col>
							<Col> 
								<Change 
									task={null}
									handleUpdate={this.handleUpdate}
              		handleSave={this.handleSave}
								/>
							</Col>
						</Row>
					</Card.Title>
					{this.state.tasks.map((task,i)=>
						<TableContent 
							task={task}
							key={i}
							handleDelete={this.handleDelete.bind(this,i)}
							handleUpdate={this.handleUpdate.bind(this,i)}
							handleSave={this.handleSave}
						/>
					)}
				</Card.Body>

			</Card>
		)
  }
}

export default TimeBlock;