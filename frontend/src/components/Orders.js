import React from "react";
import Footer1 from "./Footer1";
import Nav2 from "./Nav2";
import { Container, Alert, Button, Card } from "react-bootstrap";

export default function Orders() {
  return (
    <>
      <Nav2 />
      <Container className="p-3">
        <Card className="col-10 p-2 m-auto">
          <Card.Header>
            <h1>Order has been placed Successfully</h1>
          </Card.Header>
          <Card.Title>
            <Alert varaint="success">
              You will receive notification to email with order details
            </Alert>
          </Card.Title>
          <Card.Footer>
            <Button varaint="secondary" href="/dashboard">
              Go an order some other{" "}
            </Button>
          </Card.Footer>
        </Card>
      </Container>
      <Footer1 />
    </>
  );
}
