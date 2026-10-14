import React from "react";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";

class InfoCard extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <React.Fragment>
                <Col md={4}>
                    <Card>
                        <Card.Header><h3>{this.props.title} - {this.props.index}</h3></Card.Header>
                        <Card.Body><p>{this.props.body}</p></Card.Body>
                    </Card>
                </Col>
            </React.Fragment>
        );
    }

}

export default InfoCard;
