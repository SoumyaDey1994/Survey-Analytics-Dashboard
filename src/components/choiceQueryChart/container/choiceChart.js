import React from 'react';
import Chart from '../view/chartView';

const ChoiceChart = (props) => {
    return(
        props.chartData  && props.chartData.map((element, index) => {
            if(Object.keys(element.answer).length > 0){
                return( 
                    <Chart element={element} 
                            getDataForChart={getDataForChart} 
                            property={ChoiceChart.defaultProps} 
                            key={index}
                    />
                )
            }else{
                 return(
                    <div style={{display: 'none'}} />
                )
            }                              
        })
    )
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
// Set default properties for chart
ChoiceChart.defaultProps = {
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
                outlineColor: '#fff',
                borderWidth : 2,
                borderColor : '#777',
                hoverBorderWidth : 5,
                hoverBorderColor : "rgba(0,0,0,0.6)",
                options : {  
                    elements: {
                        arc: {
                            borderWidth: 0
                        }
                    },
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
                    }
                }
}

export default ChoiceChart;