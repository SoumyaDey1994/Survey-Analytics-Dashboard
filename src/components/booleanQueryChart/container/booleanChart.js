import React from 'react';
import Chart from '../view/chartview';
const BooleanChart = (props) => {
    return(
        <React.Fragment>
            {
                props.chartData.map((element) => {
                if(Object.keys(element.answer).length > 0){
                    return( 
                        <Chart element={element} 
                                getDataForChart={getDataForChart} 
                                defaultProperty={BooleanChart.defaultProps}
                        />
                    )
                }else
                    return( 
                        <div style={{display: 'none'}} />
                    )   
                })
            }
        </React.Fragment>
    )
}

// Populate data to render chart
function getDataForChart(chartData, props){
    let responseLabels = Object.keys(chartData.answer);
    let responseValues = Object.values(chartData.answer);
     let data = {
         labels : responseLabels,
         datasets : [
             {
                 data : responseValues,
                 backgroundColor : props.backgroundColor
             }
         ],
         borderWidth: props.borderWidth,
         borderColor: props.borderColor,
         hoverBorderWidth: props.hoverBorderWidth,
         hoverBorderColor: props.hoverBorderColor
     }
     return data;  
}

// Set Default Properties for chart
BooleanChart.defaultProps = {
        backgroundColor: [
            '#FF6384',
            '#36A2EB',
            '#FFCE56',
        ],
        hoverBackgroundColor: [
            '#FF6384',
            '#36A2EB',
            '#FFCE56',
        ],
        borderWidth : 3,
        borderColor : '#777',
        hoverBorderWidth : 5,
        hoverBorderColor : "rgba(0,0,0,0.6)",
        options : {  
            legend : {
                display : true,
                position : 'bottom',
                labels : {
                    fontColor : '#000'
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
                    display : false,
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

export default BooleanChart;