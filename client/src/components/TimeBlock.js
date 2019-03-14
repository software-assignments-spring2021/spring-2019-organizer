import React, { Component } from 'react'
// import ReactDOM from 'react-dom';
// import { Nav } from 'react-bootstrap';
import './index.css';
// import Button from 'react-bootstrap/Button';
// import FaPencil from 'react-icons/lib/fa/pencil'
// import FaTrash from 'react-icons/lib/fa/trash'



class eventbar extends Component {
	// constructor(props) {
	// 	super(props)
	// 	this.edit = this.edit.bind(this)
	// 	this.remove = this.remove.bind(this)
	// }
	// edit() {
	// 	alert('editing note')
	// }
	// remove() {
	// 	alert('removing note')
	// }
	render() {
		return (
		<table class="container">
			<thead>  
				<tr>					
					<th>Dates: 3/10/2019</th> 
					<th>Estiamtion of time:</th>
					<button type="button" class="btn btn-primary btn-sm">Add New Event</button>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td>Task 1</td>
					<td>1:30 Hrs</td>
					{/* <button id="demo">Done</button> */}
					
					{/* document.getElementById("demo").onclick = function() {myFunction()};
					<script>

					function myFunction() {
  						document.getElementById("demo").innerHTML = "YOU CLICKED ME!";
					}
					</script> */}
					<button type="button" class="btn btn-success btn-sm">Done</button>
  					<button type="button" class="btn btn-info btn-sm">Edit</button>
					<button type="button" class="btn btn-danger btn-sm">Delete</button>
				</tr>
			</tbody>
			<script>
			
			</script>
			
		</table>

		)
	}
}

export default eventbar


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