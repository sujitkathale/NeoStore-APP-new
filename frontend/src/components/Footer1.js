import React from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  ModalFooter,
} from "react-bootstrap";
export default function Footer1() {
  return (
    <footer>
      <Container fluid className="footer justify-content-between px-2 my-1">
        <Row xs="3" className="bg-dark text-white text-center p-2">
          <Col className="px-5 py-2">
            <h5 className="p-2">
              <b>About Company</b>
            </h5>
            <p>
              NeoSoft Technologies is here at your quick and easy service for
              shopping <br /> Contact Information <br /> Email:
              contact@neosoftmail.com <br />
              Phone: +91 0000000000 <br />
              MUMBAI, INDIA
            </p>
            <p></p>
          </Col>
          <Col className="px-5 py-2">
            <h5 className="p-2">
              <b>Information</b>
            </h5>
            <p>
              Terms and Conditions <br />
              Guarantee and Return Policy <br />
              Contact Us
              <br />
              Privacy Policy
              <br />
              Locate Us
            </p>
          </Col>
          <Col className="px-5 py-2">
            <h5 className="p-2">Newsletter</h5>
            <p>
              Signup to get exclusive offer from our favorite branch and to get
              news <br />
            </p>
            <Form className="px-2">
              <Form.Control type="text" placeholder="Enter email.." />
              <Button className="my-1" variant="success">
                SUBSCRIBE
              </Button>
            </Form>
          </Col>
        </Row>
        <Row className="bg-dark p-2">
          <p className="m-auto text-light">
            Copyright 2021 NeoSOFT Technologies All rights reserved | Design By
            Sujit Kathale
          </p>
        </Row>
      </Container>
    </footer>
  );
}
