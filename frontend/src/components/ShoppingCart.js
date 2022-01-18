import React, { useState, useEffect } from "react";
import { Container, Button, Card, Row, Col } from "react-bootstrap";
import Nav2 from "./Nav2";
import Footer1 from "./Footer1";
import { getOrder, deleteorder } from "./config/Myservice";
import { useNavigate } from "react-router";
export default function ShoppingCart() {
  let [orders, setOrders] = useState([]);
  let [total, setTotal] = useState(0);
  let [subTotal, setsubTotal] = useState(0);
  let [gst, setGst] = useState(0);
  const navigate = useNavigate();
  useEffect(() => {
    getOrder(sessionStorage.getItem("user")).then((res) => {
      if (!res.data.msg) {
        setOrders(res.data.orders);

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
      }
    });
  }, []);
  const deleteord = (id) => {
    deleteorder(id).then((res) => {
      alert(res.data.msg);
      window.location.reload();
      navigate("/cart");
    });
  };
  return (
    <Container fluid>
      <Nav2 />
      <h6 className="p-2">
        <i className="fa fa-info-circle text-primary"></i>Cart
      </h6>
      <Container fluid className="mt-3">
        {orders.length !== 0 ? (
          <>
            <Row>
              <Col>
                <Card className="p-2 shadow-lg">
                  {orders.map((item) => (
                    <Card className="m-2 shadow-lg">
                      <Row className="p-2">
                        <Col className="col-3">
                          <Card.Img
                            variant="top"
                            src={`/images/${item.image}`}
                            width="50"
                            height="100"
                          />
                        </Col>
                        <Col className=" col-6">
                          <Card.Body>
                            <Card.Title>{item.pname}</Card.Title>
                            <div>
                              <Card.Text>${item.price}</Card.Text>
                            </div>
                            <Card.Text>
                              <b>Quantity: </b>
                              {item.quantity}
                            </Card.Text>
                          </Card.Body>
                        </Col>
                        <Col className="col-2 p-5">
                          <Button
                            variant="dark"
                            onClick={() => deleteord(item._id)}
                          >
                            Delete
                          </Button>
                        </Col>
                      </Row>
                    </Card>
                  ))}
                </Card>
              </Col>
              <Col className="col-4">
                <Card>
                  <Card.Header>Review Order</Card.Header>
                  <Card.Title className="p-2">
                    <b>SubTotal: </b>${subTotal} <br />
                    <hr />
                    <b>GST (5%):</b> ${gst} <br />
                    <hr />
                    <b>Order Total: </b>${total}
                  </Card.Title>
                  <Button href="/checkout" variant="dark">
                    Check out
                  </Button>
                </Card>
              </Col>
            </Row>
          </>
        ) : (
          <h3 className="mt-5 bg-secondary p-2">Your cart is empty</h3>
        )}
      </Container>
      <Footer1 />
    </Container>
  );
}
