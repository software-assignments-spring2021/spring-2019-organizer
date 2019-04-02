import React, { Component } from 'react'
import '../css/TimeBlock.css';

class FixedTable extends Component{



    render(){
        return(
            <tr>
                    <td><p>{this.props.fName}</p>
                    </td>
                    
					<td><p>{this.props.fDate}</p>
                    </td>

                    <td><p>{this.props.fDuedate}</p>
                    </td>
					
                    
			</tr>
        )
    }


}

export default FixedTable;