import React from 'react';
import {Bar} from 'react-chartjs-2';
import { Card, CardBody, CardHeader } from 'reactstrap';

const Chart = ({chartData, getDataForChart, property}) => {
    return (
        <Card>
                <CardHeader>
                    User Count/Department
                </CardHeader>
                <CardBody>
                  <div className="chart-wrapper">
                    <Bar 
                        data={getDataForChart(chartData, property)}
                        options={property.options}
                    />
                  </div>
                </CardBody>
            </Card>
    )
}

export default Chart;