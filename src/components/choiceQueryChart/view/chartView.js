import React from 'react';
import {Pie} from 'react-chartjs-2';
import { Card, CardBody, CardHeader } from 'reactstrap';

const Chart = ({element, getDataForChart, property}) => {
    return(
        <Card key={element.staticName}>
            <CardHeader>
                {element.query}
            </CardHeader>
            <CardBody>
                <div className="chart-wrapper">
                    <Pie
                        data = {getDataForChart(element, property)}
                        options={{
                                legend : property.options.legend,
                                scales : property.options.scales,
                                layout : property.options.layout,
                                plugins : property.options.plugins
                            }}
                        />
                </div>
            </CardBody>
        </Card>
    )
}

export default Chart;