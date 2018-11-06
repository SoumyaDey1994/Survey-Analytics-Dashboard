import React from 'react';
import './notFound.css';
import { Card, CardBody, CardHeader} from 'reactstrap';
const NotFound = () => {
    return(
        <Card className="notFoundError">
            <CardHeader className="card-header">
                <h4>404 Not Found</h4>
            </CardHeader>
            <CardBody>
                <h1>Page Not Found</h1>
                <p>You Need to Provide Survey ListId as a parameter with name <strong>LIST</strong>.</p>
            </CardBody>
        </Card>
    )
}

export default NotFound;