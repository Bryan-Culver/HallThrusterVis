import React from "react";

import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Carousel from "react-bootstrap/Carousel";
import "./GeneralInfo.css";

/*
This Class has been developed to produce a carousel at the top of the webpage displaying general information
about the Psyche mission and the Hall Effect Thruster's role.
@author Bryan Culver
 */

class GeneralInfo extends React.Component{
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <React.Fragment>
                <Container>

                    <Card className={"border-0"}>
                        <Card.Body>
                            <a className="genInfo">
                                <span></span>
                            </a>
                            <Carousel indicators={false} className="uniform-carousel">
                                <Carousel.Item>
                                    <h3 className="text-center w-75 mx-auto"> For the first time ever we are exploring a world made not of rock or ice, but of metal.</h3>
                                </Carousel.Item>
                                <Carousel.Item>
                                    <h3 className="text-center w-75 mx-auto"> Solar electric propulsion will propel the Psyche spacecraft. </h3>
                                </Carousel.Item>
                                <Carousel.Item>
                                    <h3 className="text-center w-75 mx-auto"> The 2 onboard Hall-Effect Thrusters will provide 5 years of propulsion for Psyche </h3>
                                </Carousel.Item>
                            </Carousel>
                        </Card.Body>
                    </Card>
                </Container>
            </React.Fragment>
        )
    }
}
export default GeneralInfo;