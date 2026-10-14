import React from "react";
import jsonData from "../Facts";
import InfoCard from "./InfoCard/InfoCard";
import Carousel from "react-bootstrap/Carousel";
import Card from "react-bootstrap/Card";
import bgslide2 from "../assets/images/bgslide2.jpg"
import Container from "react-bootstrap/Container";
import CarouselItem from "react-bootstrap/CarouselItem";

// This class is specific to creating the carousel elements to the facts that are shown on the page
class DataCars extends React.Component{
    constructor(props) {
        super(props);

    }

    render() {

        let dataName = this.props.dataName;
        let source = this.props.source;


        // read json data for cards
        const loadData = () => JSON.parse(JSON.stringify(jsonData));
        let json = loadData();
        const cards = [];
        let viewData = json[dataName];
        const bgImage = viewData[0].image;
        const bgCredit = viewData[0].credit;
        console.log(bgImage);
        viewData.forEach(function(key){
            if (key.hasOwnProperty('id')) {
                cards.push({
                    key: key['id'],
                    ind: key['id'],
                    body: key['data']
                });
            }
        });

        return(

            <Card className={"border-0"}>

                <Card.Img
                    variant="bottom"
                    src={bgImage}
                    className={"w-50 h-50 mx-auto"}
                />
                <footer className="blockquote-footer text-center">
                    <small className="text-muted text-center">Image Credit: {bgCredit}</small>
                </footer>

                <Card.Body>
                    <Carousel indicators={false} interval={8000} className="uniform-carousel">
                        {/* iterates through map to create a new carousel item with facts to display*/}
                        {cards.map((item, ind) => (
                            <Carousel.Item key={ind}>
                                {/*<img*/}
                                {/*    className="d-block mx-auto"*/}
                                {/*     height={250}*/}
                                {/*/>*/}
                                <h5 className="justify-content-center text-center textmaroon w-75 mx-auto" alt="slide">{item.body}</h5>

                            </Carousel.Item>
                        ))}
                    </Carousel>
                </Card.Body>
            </Card>
        )



    }
}
export default DataCars;