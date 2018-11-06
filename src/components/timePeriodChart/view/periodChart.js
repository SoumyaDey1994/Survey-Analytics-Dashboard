import React, {Component} from 'react';
import {Line} from 'react-chartjs-2';
import { Card, CardBody, CardHeader } from 'reactstrap';

class PeriodChart  extends Component{

    render(){
        return(
            <Card style={{display : 'none'}}>
                <CardHeader>
                    User Response Over Time
                </CardHeader>
                <CardBody>
                    <div className="chart-wrapper">
                        {/* <Line
                            data={null}
                            options={null}
                        /> */}
                        <div>This Chart will get deployed soon</div>
                    </div>
                </CardBody>
            </Card>
        );
    }
}

export default PeriodChart;