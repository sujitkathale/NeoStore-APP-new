import React, { useState, useEffect } from "react";
import {
  Container,
  Card,
  Button,
  Row,
  Col,
  Image,
  Tab,
  Tabs,
} from "react-bootstrap";
import { getProductdetails } from "./config/Myservice";
import Nav2 from "./Nav2";
import Footer1 from "./Footer1";

export default function ProductDetails() {
  let [products, setProducts] = useState([]);
  const [key, setKey] = useState("description");

  useEffect(() => {
    getProductdetails(sessionStorage.getItem("user")).then((res) => {
      if (res.data.products) {
        console.log(res.data.products);
        setProducts(res.data.products);
      }
    });
  }, []);
  return (
    <>
      <Nav2 />
      <Container>
        <Row className="p-4">
          <Col lg={4} md={6} sm={12}>
            <Image
              src={`/images/${products.image}`}
              height="350"
              width="350px"
              rounded
            />
          </Col>
          <Col lg={8} md={6} sm={12}>
            <Card>
              <Card.Header className="bg-danger ">
                <h3>
                  <b className="text-white">Product Description</b>
                </h3>
              </Card.Header>
              <Card.Body>
                <Card.Header className=" bg-light text-dark">
                  <Card.Title>
                    <h2>
                      <b>{products.pname}</b>
                    </h2>
                  </Card.Title>
                </Card.Header>
                <Card.Title className="my-3">
                  <h4>
                    <b>Price: </b>
                    <span className="text-success">${products.price}</span>
                  </h4>

                  <h4>
                    <b>Product Stock:</b> {products.stock}
                  </h4>

                  <h4>
                    <b>Rating:</b> {products.rating}{" "}
                    <i className="fa fa-star text-warning"></i>
                  </h4>
                  <br />
                </Card.Title>
                <Card.Footer className="text-muted">
                  <Button variant="primary" className="btn-lg w-50">
                    add to cart
                  </Button>
                </Card.Footer>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Container fluid>
          <Tabs activeKey={key} onSelect={(k) => setKey(k)} className="mb-3">
            <Tab eventKey="description" title="Description">
              <h5 className="py-5">{products.product_desc}</h5>
            </Tab>
            <Tab eventKey="features" title="Features">
              <h2>Features</h2>
              <p></p>
            </Tab>
          </Tabs>
        </Container>
      </Container>
      <Footer1 />
    </>
  );
}
