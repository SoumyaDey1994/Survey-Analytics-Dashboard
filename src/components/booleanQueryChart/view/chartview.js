import React from 'react';
import {Doughnut} from 'react-chartjs-2';
import { Card, CardBody, CardHeader } from 'reactstrap';

const chart = ({element, getDataForChart, defaultProperty}) => {
    return(
        <Card key={element.staticName}>
            <CardHeader>
                {element.query}
            </CardHeader>
            <CardBody>
                <div className="chart-wrapper">
                    <Doughnut
                         data={getDataForChart(element, defaultProperty)}
                                options={{
                                    legend : defaultProperty.options.legend,
                                    scales : defaultProperty.options.scales,
                                    layout : defaultProperty.options.layout,
                                    plugins : defaultProperty.options.plugins
                                }}
                    />
                </div>
            </CardBody>
        </Card>
    )
}

export default chart;