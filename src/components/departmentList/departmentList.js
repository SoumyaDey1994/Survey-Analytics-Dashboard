import React, {Component} from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

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
    render(){
        return (
            <React.Fragment>
                <Dropdown isOpen={this.state.dropdownOpen} onClick={()=> this.toggleState()}>
                    <DropdownToggle caret>
                       Select a Department
                    </DropdownToggle>
                    <DropdownMenu>
                    {
                        this.props.departmentList.map(dept => <DropdownItem>{dept}</DropdownItem>)
                    }
                    </DropdownMenu>
                </Dropdown>
            </React.Fragment>
        )
    }
}

export default DepartmentList;