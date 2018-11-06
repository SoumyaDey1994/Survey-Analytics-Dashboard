import React from 'react';
import GridChart from '../../gridChart/container/gridChart';
import { Card, CardBody, CardHeader } from 'reactstrap';

const GridChoiceChart = (props) => {
    //render the chart
        return(
            props.chartData && props.chartData.map((element) => {
                        return(
                            <Card key={element.staticName}>
                                <CardHeader className="card-header">
                                            {element.query}
                                </CardHeader>
                                <CardBody>
                                    <GridChart chartData={element.answer} /> 
                                </CardBody>
                            </Card>
                        )
            })
        )
}

export default GridChoiceChart;