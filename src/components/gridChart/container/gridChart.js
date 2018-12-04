import React from 'react';
import Chart from '../view/chartView';

const GridChart = (props) => {
    return(
        props.chartData && (Object.values(props.chartData).filter(item => Object.values(item).length > 0)).length > 0 //check wether any rating is present or not
                            && Object.values(props.chartData).map((item, index) => {
           return (
               <Chart index={index} 
                      item={item}
                      getDataForChart={getDataForChart}
                      property={props}
                      key={index}
                />
           )
        })
    )
}
// Populate data to render chart
function getDataForChart(item, props){
    const responseLabels = Object.keys(item);
    const responseValues = Object.values(item);
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
//Set default properties for chart
GridChart.defaultProps = {
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
            }
        },
        layout : {
            padding: 5,
            margin: 5
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

export default GridChart;