import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Model from "./Model";
import InfoCard from "./InfoCard/InfoCard";
import { ForwardNav, BackwardNav } from "./NavControl/NavControl";
import './HomePageGrid.css';
import jsonData from '../ComponentInfoFile.json';
import Carousel from "react-bootstrap/Carousel";
import Card from "react-bootstrap/Card";
import listing from '../Listing.json';
import GeneralInfo from "./GeneralInfo/GeneralInfo";

class HomePageGrid extends React.Component{
    constructor(props) {
        super(props);
    }

    changeView = (item) => {
        this.setState({viewId: item});
        this.props.onChange(item);
        console.log("arrow nav click to: " + item);
    };

    render() {
        let viewId = this.props.viewId;

        // determine next and prev for navigation arrows
        const loadOrder = () => JSON.parse(JSON.stringify(listing));
        let order = loadOrder();

        let next = "";
        let prev = "";
        for(let idx in order) {
            if (order.hasOwnProperty(idx)) {
                if (idx === viewId) {
                    next = order[idx]["next"];
                    prev = order[idx]["prev"];
                }
            }
        }

        // read json data for cards
        const loadData = () => JSON.parse(JSON.stringify(jsonData));
        let json = loadData();
        const carItems=[];
        let viewData = json[viewId];
        viewData.forEach(function(key){
            if (key.hasOwnProperty('id')) {
                carItems.push({
                    key: key['id'],
                    ind: key['id'],
                    body: key['data']
                });
            }


        });

        return (

            <Container fluid={true} className={"App-body"}>

                {/* row containing entirety of app */}
                <Row className={"my-5"}>

                    {/* column containing all middle of page content */}
                    <Col className={"justify-content-md-center"}>
                        <GeneralInfo/>
                    </Col>
                </Row>

                <Row>
                    <Col xs={2} md={1} id={"back-nav-arrow"} className={"align-self-center"}>
                        { prev === "" ? null : <BackwardNav prev={prev} arrowClick={this.changeView.bind(this)}/> }
                    </Col>

                    <Col xs={8} md={10} id={"model-view"} className={"align-self-center"}>
                        <Model viewId={viewId}/>
                    </Col>

                    <Col xs={2} md={1} id={"forward-nav-arrow"} className={"align-self-center"}>
                        { next === "" ? null : <ForwardNav next={next} arrowClick={this.changeView.bind(this)}/> }
                    </Col>
                </Row>

                    {/*</Col>*/}
                {/*</Row>*/}
                {/*Container containing individual components info */}
                <Container fluid={true} className={"App-body justify-content-centered my-5"}>
                    <Card className={"border-0 my-5"}>
                        <Card.Header className={"border-0"}>
                            <h2 className={"section-title border-0"} align={"center"}> {this.props.viewId} </h2>
                        </Card.Header>
                        <Card.Body>
                            <Carousel indicators={false} className={"justify-content-center uniform-carousel"}>
                                {/* iterates through map to create a new carousel item with facts to display*/}
                                    {carItems.map((item, ind) => (
                                        <Carousel.Item key={ind}>
                                            {/*<img*/}
                                            {/*    className={"d-block mx-auto"}*/}
                                            {/*    height={250}*/}
                                            {/*/>*/}
                                            <h5 className="d-block justify-content-center text-center carousel-text w-75 mx-auto" alt="slide">{item.body}</h5>
                                        </Carousel.Item>
                                    ))}
                            </Carousel>
                        </Card.Body>
                    </Card>
                </Container>
            </Container>

        )
    }
}

export default HomePageGrid;