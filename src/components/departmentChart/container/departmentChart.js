import React from 'react';
import Chart from '../view/chartView';

const DepartmentUserChart = (props) => {
    return (
            <Chart chartData={props.chartData} 
                   getDataForChart={getDataForChart} 
                   property={DepartmentUserChart.defaultProps}
            />
        );
}
// Populate data to render chart
function getDataForChart(chartData, props){
    let departments = chartData.map(obj => obj.department);
    let totalNoOfUsersOfDepartments = chartData.map(obj => obj.totalNoOfUsersToRespond);
    let totalNoOfUsersResponded = chartData.map(obj => obj.noOfUsersReesponded);
    let data = {
        labels : departments,
        datasets : [
            {
                label : "No of Users Responded",
                data : totalNoOfUsersResponded,
                backgroundColor : props.backgroundColor2
            },
            {
                label : "Total No of Users",
                data : totalNoOfUsersOfDepartments,
                backgroundColor : props.backgroundColor1
            }
        ],
        borderWidth: props.borderWidth,
        borderColor: props.borderColor,
        hoverBorderWidth: props.hoverBorderWidth,
        hoverBorderColor: props.hoverBorderColor
    }
    return data;  
}
//Set default properties for Chart
DepartmentUserChart.defaultProps = {
    backgroundColor1: '#FF6384',
        backgroundColor2: '#36A2EB',
        borderWidth : 3,
        borderColor : '#777',
        hoverBorderWidth : 5,
        hoverBorderColor : "rgba(0,0,0,0.6)",
        options : {  
            legend : {
                display : true,
                position : 'bottom',
                labels : {
                    fontColor : '#000',
                }
            },
            layout : {
                padding: 10,
                margin: 10
            },
            plugins: {
                datalabels: {
                   display: true,
                   color: 'white'
                }
             },
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true,
                        userCallback: function(label, index, labels) {
                            // when the floored value is the same as the value we have a whole number
                            if (Math.floor(label) === label) {
                                return label;
                            }
                        }
                    }
                }]
            },
        }
}

export default DepartmentUserChart;