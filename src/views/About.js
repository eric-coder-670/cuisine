import { Row, Col, Card, CardBody, CardTitle, Button } from "reactstrap";

const About = () => {
  return (
    <Row>
      <Col>
        {/* --------------------------------------------------------------------------------*/}
        {/* Card-1*/}
        {/* --------------------------------------------------------------------------------*/}
        <Card>
          <CardTitle tag="h6" className="border-bottom p-3 mb-0">
            <i className="bi bi-bell me-2"> </i>
            A propos de Cuisisne237
          </CardTitle>
          <CardBody className="p-4">
            <Row justify-content>
              <Col lg="8">
                <h2 className="mt-4" style={{color:"#8952e7ff"}}>Cuisine237</h2>
                <h5 className=" mb-4" >
                Cuisine237 est une application Web permetant de faire decourvrir les différents mets culinaires du cameroun. 
                Elle est un concentré de culture et de gastronomie de mets provenant des différentes regions du cameroun...
                </h5>
                <img
                  src="https://demos.wrappixel.com/free-admin-templates/angular/landingpage-styles/assets/images/screenshots/adminpro-react-pro-lp-img.jpg"
                  alt="my"
                />
                <br />
                <Button
                  className="mt-3"
                  color="primary"
                  target="_blank"
                >
                En savoir plus
                </Button>
              </Col>
            </Row>
          </CardBody>
        </Card>
      </Col>
    </Row>
  );
};

export default About;
