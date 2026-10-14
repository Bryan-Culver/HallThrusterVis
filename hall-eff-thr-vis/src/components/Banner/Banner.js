import React from 'react';
import './Banner.css';
import nasaIcon from '../../assets/images/nasaIcon.PNG';
import psycheIcon from '../../assets/images/psycheIcon.PNG';

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

class Banner extends React.Component{

    constructor(props) {
        super(props);
    }

    render() {

        return (
                <Container className='Banner-header' fluid={true}>
                    <Row>
                        <Col md = {10}>
                            <h3 className="Banner-text">
                                Hall Effect Thruster Visualization
                            </h3>
                        </Col>
                        <Col md = {1}>
                            <a
                                href="https://psyche.asu.edu"
                                target="_blank">
                                <img src={psycheIcon}
                                     className="Banner-logo"
                                     alt="psycheIcon"
                                /> &nbsp;
                            </a>
                        </Col>
                        <Col md = {1}>
                            <a
                                href="http://www.nasa.gov"
                                target="_blank">
                                <img src={nasaIcon}
                                     className="Banner-logo"
                                     alt="nasaIcon"
                                /> &nbsp;
                            </a>
                        </Col>
                    </Row>
                </Container>

        )
    }
}

export default Banner;