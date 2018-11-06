import React from 'react';
import {Polar} from 'react-chartjs-2';
import { Card, CardBody, CardHeader } from 'reactstrap';

const Chart = ({index, item, getDataForChart, property}) => {
    return(
        <Card key={index}>
            <CardHeader>
                {Object.keys(property.chartData)[index]}
            </CardHeader>
            <CardBody>
                <div className="chart-wrapper">
                    <Polar
                        data = {getDataForChart(item, property)}
                            options={{
                            legend : property.options.legend,
                            scales : property.options.scales,
                            layout : property.options.layout,
                            plugins : property.options.plugins
                        }}/>
                </div>
            </CardBody>
        </Card>
    )
}

export default Chart;