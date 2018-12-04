import React from 'react';
import './header.css';
import { Nav, NavItem} from 'reactstrap';
import * as jsPDF from 'jspdf';
import * as html2canvas from 'html2canvas';
import DepartmentList from '../../departmentList/departmentList';

const Header = (props) => {
    let allDepartments = props.departmentList.map(obj => obj.department);
    allDepartments.unshift("All Departments");
    return(
        <React.Fragment>
             <Nav className="header" navbar>
                <NavItem className="px-3">
                    <button className="btn btn-outline-danger btn-sm m-1 float-sm-right" onClick={()=>downloadChartsAsPDF()}>Export as PDF</button>
                    {/* <button className="btn btn-outline-success btn-sm m-1 float-sm-right" onClick={props.exportAsExcel}>Export as Excel</button> */}
                    <DepartmentList className="float-sm-left" style={{padding: '0px auto'}}
                                    handleFilter={props.handleDepartmentFilter} 
                                    departmentList={allDepartments}>
                    </DepartmentList>
                </NavItem>
            </Nav>
        </React.Fragment>
    )
}
//Method to create and download PDF from charts
function downloadChartsAsPDF(){
    const input = document.getElementById('charts');
    const pageWidth = input.clientWidth * 1.2;
    const pageHeight = input.clientHeight;

    html2canvas(input)
      .then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p','pt', [pageWidth, pageHeight]);
        pdf.addImage(imgData, 'PNG', 0, 0);
        pdf.save("SaysoAnalytics.pdf");
      })
}

export default Header;