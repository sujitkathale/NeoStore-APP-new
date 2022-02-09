import React, { useState, useEffect } from "react";
import { Container, Form, Button, Row, Col, Card } from "react-bootstrap";
import { getOrder, checkout_order } from "./config/Myservice";
import { useNavigate } from "react-router";
import Nav2 from "./Nav2";
import Footer1 from "./Footer1";
export default function Checkout() {
  const [cnumber, setCnumber] = useState(0);
  let [total, setTotal] = useState(0);
  let [subTotal, setsubTotal] = useState(0);
  let [gst, setGst] = useState(0);
  const navigate = useNavigate();
  useEffect(() => {
    getOrder(sessionStorage.getItem("user")).then((res) => {
      const stl = res.data.orders.reduce(
        (prev, cur) => prev + cur.price * cur.quantity,
        0
      );
      setsubTotal(stl);

      const gst = res.data.orders.reduce(
        (prev, cur) => stl + (stl / 100) * 5 - stl,
        0
      );
      setGst(gst);

      const ttl = res.data.orders.reduce(
        (prev, cur) => prev + cur.price * cur.quantity,
        0
      );
      setTotal(ttl + gst);
    });
  }, []);
  const checkout = () => {
    checkout_order(sessionStorage.getItem("user")).then((res) => {
      alert(res.data.msg);
      navigate("/order");
    });
  };
  return (
    <>
      <Nav2 />
      <Container className="mt-3 mb-3">
        <h2>Check out</h2>
        <Card className="col-6 m-auto">
          <Card.Header>Checkout</Card.Header>
          <Card.Body>
            <Card.Text>
              <Form>
                <Form.Group className="mb-3" as={Row}>
                  <Form.Label column sm={4}>
                    Credit card
                  </Form.Label>
                  <Col sm={7}>
                    <Form.Control
                      type="number"
                      placeholder="Enter credit card number"
                      name="cnumber"
                      onChange={(e) => {
                        setCnumber(e.target.value);
                      }}
                      required
                    />
                    {cnumber != " " && cnumber.length < 16 && (
                      <span className="text-danger">
                        Enter creidt card number correctly
                      </span>
                    )}
                  </Col>
                  <Col>
                    <h4 className="mt-4">Order total: ${total}</h4>
                  </Col>
                </Form.Group>
                <Button
                  variant="primary"
                  className=" btn-lg btn-block"
                  onClick={() => checkout()}
                >
                  Check out
                </Button>
              </Form>
            </Card.Text>
          </Card.Body>
        </Card>
      </Container>
      <Footer1 />
    </>
  );
}
