import React, { Component } from 'react'
import '../css/TimeBlock.css';

class TableContent extends Component {
    constructor(){
        super();
        this.state = {
            
        }
    }

    handleEdit = () =>{
        this.refs.Name.contentEditable = 'true'
        this.refs.Date.contentEditable = 'true'
        this.refs.Duedate.contentEditable = 'true'
        
    }

    handleNameBlur = () =>{
        this.refs.Name.contentEditable = 'false'
        var TName = this.refs.Name.innerHTML
        this.props.handleNameBlur(TName)
    }

    handleDateBlur = () =>{
        this.refs.Date.contentEditable = 'false'
        var TDate = this.refs.Date.innerHTML
        this.props.handleDateBlur(TDate)
    }

    handleDuedateBlur = () =>{
        this.refs.Duedate.contentEditable = 'false'
        var TDuedate = this.refs.Duedate.innerHTML
        this.props.handleDuedateBlur(TDuedate)
    }



    render(){
        return(
            <tr>
                    <td><p contenteditable="false" ref='Name' onBlur={this.handleNameBlur}>{this.props.tName}</p>
                    </td>
                    
					<td><p contentEditable="false" ref='Date' onBlur={this.handleDateBlur}> {this.props.tDate}</p>
                    </td>

                    <td><p contentEditable="false" ref='Duedate' onBlur={this.handleDuedateBlur}> {this.props.tDuedate}</p>
                    </td>
					<button type="button" class="btn btn-success btn-sm"
                            onClick={this.props.handleDone}
                    >Done</button>


  					<button type="button" class="btn btn-info btn-sm"
                            onClick={this.handleEdit}
                    >Edit</button>
                    <button type="button" class="btn btn-danger btn-sm"  variant="danger"
                            onClick={this.props.handleDelete}>Delete</button>
                    
			</tr>
        )
    }


}

export default TableContent;