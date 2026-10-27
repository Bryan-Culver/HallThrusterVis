import React from "react";
import Info from "../ComponentInfoFile";
import Facts from "../Facts";
import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";
import Card from "react-bootstrap/Card";
import Nav from "react-bootstrap/Nav";
import Carousel from "react-bootstrap/Carousel";
import psyche from "../assets/images/16psyche.jpg";
import spacecraft from "../assets/images/spacecraft.jpg";
import Fade from "react-bootstrap/Fade";
import DataCars from "./DataCars";
import thrus1 from "../assets/images/hallthruster1.jpg";
import thrus2 from "../assets/images/hallthruster2.jpg";
import thrus3 from "../assets/images/hallthruster3.jpg";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col"
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import Navbar from "react-bootstrap/Navbar";



class FactCards extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            key: "background"
        };
    }

 render() {
        console.log(this.state.key)
     const loadData =() => JSON.parse(JSON.stringify(Facts));
     let order = loadData();
     const names = []
     for (let idx in order){
         console.log(idx)
         names.push({
             key : idx,
             id : idx
         });
     }


     return(
         <React.Fragment>
             <Container fluid className={"facts-section"}>
                 <Tab.Container id="facts" defaultActiveKey={0} onSelect={key => this.setState({key})}>
                     <Card className={"border-0"}>
                         <Card.Header className={"border-0"}>
                             <Nav
                                 className="nav-justified tab-color nav-pills"
                                 //variant="pills"
                             >
                                 {names.map((item, ind ) => (

                                     <Nav.Item key={ind}>
                                     <Nav.Link eventKey={ind}>{item.key}</Nav.Link>
                                     </Nav.Item>
                                 ))}


                                 {/*<Nav.Item >*/}
                                 {/*    <Nav.Link className="nLink" eventKey="applications">Applications</Nav.Link>*/}
                                 {/*</Nav.Item>*/}
                                 {/*<Nav.Item>*/}
                                 {/*    <Nav.Link className="nLink" eventKey="psycheuse">Psyche Use</Nav.Link>*/}
                                 {/*</Nav.Item>*/}
                                 {/*<Nav.Item >*/}
                                 {/*    <Nav.Link className="nLink" eventKey="funfacts">Fun Facts</Nav.Link>*/}
                                 {/*</Nav.Item>*/}
                             </Nav>
                         </Card.Header>
                         <Card.Body>
                             <Tab.Content >
                                 {names.map((item, ind ) =>(
                                         <Tab.Pane key={ind} eventKey={ind}>
                                             <DataCars id={item.key} dataName={item.key} source={thrus1}/>
                                         </Tab.Pane>
                                     ))}
                                 {/*<Tab.Pane eventKey="background">*/}
                                 {/*    <DataCars id="background" dataName={"Background"} source={thrus1}/>*/}
                                 {/*</Tab.Pane>*/}
                                 {/*<Tab.Pane eventKey="applications">*/}
                                 {/*    <DataCars id="applications" dataName={"Applications"} source={thrus2}/>*/}
                                 {/*</Tab.Pane>*/}
                                 {/*<Tab.Pane eventKey="psycheuse">*/}
                                 {/*    <DataCars id="psycheuse" dataName={"PsycheUse"} source={spacecraft}/>*/}
                                 {/*</Tab.Pane>*/}
                                 {/*<Tab.Pane eventKey="funfacts">*/}
                                 {/*    <DataCars id="funfacts" dataName={"FunFacts"} source={thrus3}/>*/}
                                 {/*</Tab.Pane>*/}
                             </Tab.Content>
                         </Card.Body>
                     </Card>
             </Tab.Container>

             </Container>
         </React.Fragment>
     )

 }

}
export default FactCards;