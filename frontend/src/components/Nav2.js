import React, { useState, useEffect } from "react";
import {
  Container,
  Nav,
  Form,
  FormControl,
  NavDropdown,
  Badge,
  Button,
} from "react-bootstrap";
import { getOrder } from "../components/config/Myservice";
import { useNavigate } from "react-router";
export default function Nav2() {
  let [count, setCount] = useState(0);
  const navigate = useNavigate();
  useEffect(() => {
    getOrder(sessionStorage.getItem("user")).then((res) => {
      if (res.data.orders) {
        setCount(res.data.orders.length);
      }
    });
  });
  const logout = () => {
    sessionStorage.clear();
    // window.location.replace("/");
    navigate("/");
  };
  return (
    <>
      <Nav className="bg-dark">
        <Container fluid className="d-flex justify-content-between">
          <Nav.Item>
            <Nav.Link href="/dashboard">
              <h2 className="text-white">
                <b>Neo</b>
                <span>
                  <b className="text-danger">STORE</b>
                </span>
              </h2>
            </Nav.Link>
          </Nav.Item>
          <Nav className="mr-auto ml-auto ">
            <Nav.Link href="/dashboard" className=" mt-3 text-white">
              Home
            </Nav.Link>
            <Nav.Link href="/dashboard" className=" mt-3 text-white">
              Products
            </Nav.Link>
            <Nav.Link href="/allorders" className=" mt-3 text-white">
              Orders
            </Nav.Link>
          </Nav>
          <Nav className="justify-content-end">
            <Nav.Item>
              <Form className="py-3 d-flex">
                <FormControl
                  type="text"
                  placeholder="Search"
                  className="mr-1"
                />
                {/* <Button variant="outline-success">Search</Button> */}
              </Form>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href="/cart" className="mt-3 bg-light mx-2 text-dark">
                <b>
                  <i className="fa fa-cart-plus "></i>
                </b>
                {count != 0 && <Badge bg="danger"> {count}</Badge>} {""}Cart
              </Nav.Link>
            </Nav.Item>
            {/* <Nav.Item>
              <Nav.Link href="/profile" className=" mt-3 text-white">
                Profile
              </Nav.Link>
            </Nav.Item> */}

            {/* <Nav.Link
                className=" btn btn-outline-dark bg-danger text-white mt-3"
                onClick={() => logout()}
              >
                <i className="fa fa-user"></i> Logout
              </Nav.Link> */}

            <NavDropdown
              className=" bg-light text-dark mt-3 mb-3 "
              title="User"
            >
              <NavDropdown.Item href="/profile">My Account</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={() => logout()}>
                Logout
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Container>
      </Nav>
    </>
  );
}
