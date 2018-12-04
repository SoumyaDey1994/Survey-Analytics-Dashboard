import React, {Component} from 'react';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css'

class DepartmentList extends Component{
    constructor(props){
        super(props);
        this.state = {
            dropdownOpen: false
        }
    }
    toggleState(){
        this.setState( (prevState, prevProps) => {
            return {
                dropdownOpen: !prevState.dropdownOpen
            } 
        })
    }
   
    shouldComponentUpdate(){
        return false;
    }
    
    render(){
        const defaltOption = this.props.departmentList[0];
        return (
            <React.Fragment>
                <Dropdown options={this.props.departmentList} 
                          value={defaltOption}
                          onChange={(event) => this.props.handleFilter(event.value)} 
                          placeholder="Select a Department" 
                />
            </React.Fragment>
        )
    }
}

export default DepartmentList;