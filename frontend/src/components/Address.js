import React, { useState, useEffect } from "react";
import Nav2 from "./Nav2";

import Footer1 from "./Footer1";

export default function Address() {
  return (
    <>
      <Nav2 />
      <Container className="my-5">
        <h2>My Account</h2>
        <Row>
          <Col className="col-8">
            <Card>
              <Card.Header as="h5">Add Address</Card.Header>
              <Card.Body>
                <Card.Text>
                  <b style={{ fontSize: "20px" }}>Address :</b> {user.name}
                </Card.Text>
                <Card.Text>
                  <b style={{ fontSize: "20px" }}>Pincode :</b> {user.email}
                </Card.Text>
                <Card.Text>
                  <b style={{ fontSize: "20px" }}>City :</b> {user.mobile}
                </Card.Text>
                <Card.Text>
                  <b style={{ fontSize: "20px" }}>State :</b> {user.address}
                </Card.Text>
                <Card.Text>
                  <b style={{ fontSize: "20px" }}>Country :</b> {user.address}
                </Card.Text>
              </Card.Body>
              <Card.Footer className="text-muted">
                <Button variant="outline-secondary" href="/upd_profile">
                  Edit <i class="fa fa-edit"></i>
                </Button>
              </Card.Footer>
            </Card>
          </Col>
        </Row>
      </Container>
      <Footer1 />
    </>
  );
}
