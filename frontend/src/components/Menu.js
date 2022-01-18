import React, { useState, useEffect } from "react";
import {
  Container,
  Card,
  Button,
  Row,
  Col,
  ListGroup,
  Form,
  FormControl,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import { getProducts, cartAdd } from "./config/Myservice";
import Nav2 from "./Nav2";
import Footer1 from "./Footer1";
import jwt_decode from "jwt-decode";
export default function Menu() {
  const [uid, setUid] = useState("");
  let [products, setProducts] = useState([]);
  let [email, setEmail] = useState("");
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    if (sessionStorage.getItem("user") === undefined) {
      navigate("/login");
    }
    if (localStorage.getItem("_token") != undefined) {
      let token = localStorage.getItem("_token");
      let decode = jwt_decode(token);
      console.log(decode);
      setUid(decode.uid);
      setEmail(sessionStorage.getItem("user"));
      getProducts().then((res) => {
        console.log(res.data);
        if (res.data.err) {
          alert(res.data.err);
        } else {
          setProducts(res.data.products);
        }
      });
    }
  }, []);
  const addCart = (item) => {
    window.location.reload();
    console.log(item);
    cartAdd(item, email).then((res) => {
      alert(res.data.msg);
    });
  };
  return (
    <>
      <Nav2 />
      <Container fluid>
        <Row>
          <Col className="col-2">
            <Container>
              <Card
                className="mt-4"
                style={{ width: "16rem", border: "2px solid black" }}
              >
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <Form className="py-3 d-flex">
                      <FormControl
                        type="text"
                        placeholder="Search"
                        className="mr-1"
                        style={{ border: "2px solid red" }}
                        onChange={(e) => setQuery(e.target.value)}
                      />
                    </Form>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Form.Select
                      className="text-white w-250 my-1 custom-select custom-select-lg mb-3 bg-danger"
                      onChange={(e) => setQuery(e.target.value)}
                    >
                      <option value="">Categories</option>
                      <option value="61e30199c4636cdab1a2bdf0">Jacket</option>
                      <option value="61e301a5c4636cdab1a2bdf1">Jeans</option>
                      <option value="61e301b0c4636cdab1a2bdf2">Shoes</option>
                      <option value="61e301dac4636cdab1a2bdf3">T-Shirts</option>
                      <option value="61e3029cc4636cdab1a2bdf4">Caps</option>
                    </Form.Select>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Form.Select
                      className="custom-select custom-select-lg mb-3 w-250 my-1 bg-danger text-white"
                      onChange={(e) => setQuery(e.target.value)}
                    >
                      <option value="">Color</option>
                      <option value="">All</option>
                      <option value="61e30313c4636cdab1a2bdf7">Black</option>
                      <option value="61e302e9c4636cdab1a2bdf5">Orange</option>
                      <option value="61e302ffc4636cdab1a2bdf6">Blue</option>
                      <option value="61e3036bc4636cdab1a2bdf9">Sky Blue</option>
                    </Form.Select>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Container>
          </Col>
          <Col className="col-10">
            <Container className="mt-3">
              {/* <h3>Menu</h3> */}
              <Row>
                {products
                  .filter((products) => {
                    if (query === "") {
                      return products;
                    } else if (
                      products.pname
                        .toLowerCase()
                        .includes(query.toLowerCase()) ||
                      products.category_id.includes(query) ||
                      products.color_id.includes(query)
                    ) {
                      return products;
                    }
                  })
                  .map((item) => (
                    <Col lg={4} key={item._id}>
                      <Card className="m-2">
                        <Card.Img
                          variant="top"
                          src={`/images/${item.image}`}
                          height="200"
                        />
                        <Card.Body className="">
                          <div className="d-flex justify-content-between">
                            <Card.Title>
                              <Link
                                className="text-info my-3"
                                to={`/productdetails/${item._id}`}
                              >
                                {item.pname}
                              </Link>
                            </Card.Title>

                            <Card.Title>
                              {item.rating}{" "}
                              <i className="fa fa-star text-warning"></i>
                            </Card.Title>
                          </div>

                          <div className="d-flex justify-content-center">
                            <Card.Title>
                              <span className="text-danger">
                                <b>$ {item.price}</b>
                              </span>
                            </Card.Title>
                          </div>
                          <div className="d-flex justify-content-center w-250">
                            <Button
                              variant="warning"
                              className="btn-lg btn-block"
                              onClick={() => {
                                addCart(item);
                              }}
                            >
                              Add to cart <i className="fa fa-cart-plus"></i>
                            </Button>
                          </div>
                        </Card.Body>
                      </Card>
                    </Col>
                  ))}
              </Row>
            </Container>
          </Col>
        </Row>
      </Container>
      <Footer1 />
    </>
  );
}
