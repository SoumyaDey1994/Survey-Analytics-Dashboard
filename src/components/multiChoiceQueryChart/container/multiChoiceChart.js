import React from 'react';
import Chart from '../view/chartView';

const MultiChoiceChart = (props) => {
    return(
        <React.Fragment>
            {
                props.chartData  && props.chartData.map((element) => {
                    if(Object.keys(element.answer).length > 0){
                        return(
                           <Chart element={element} 
                                getDataForChart={getDataForChart} 
                                property={MultiChoiceChart.defaultProps} 
                            />
                        )
                    }else
                        return (
                                <div style={{display: 'none'}} />
                    )
                })
            }
        </React.Fragment>
    );
}
// Populate data to render chart
function getDataForChart(chartData, props){
    const responseLabels = Object.keys(chartData.answer);
    const responseValues = Object.values(chartData.answer);
     let data = {
         labels : responseLabels,
         datasets : [
             {
                 label : chartData.query,
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
MultiChoiceChart.defaultProps = {
        backgroundColor : [
            '#FF6384',
            '#4BC0C0',
            '#FFCE56',
            '#D5DBDB',
            '#EE82EE',
            '#36A2EB',
            '#FF4500',
            '#00FF66',
            '#D5DBDB',
            '#DC143C',
            '#FF8C00',
            '#7B68EE',
            '#6495ED',
            '#F4A460',
            '#FFDEAD'
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
                    fontColor : '#000',
                    font : '12px'
                }
            },
            layout : {
                padding: 0,
                margin: 0
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

export default MultiChoiceChart;