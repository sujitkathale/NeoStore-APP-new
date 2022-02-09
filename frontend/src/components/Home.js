import React, { useState, useEffect } from "react";
import { Container, Card, Button, Row, Col, Carousel } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import { getProducts } from "./config/Myservice";
import Nav1 from "./Nav1";
import Footer1 from "./Footer1";
import b5 from "../assets/b5.jpg";
import banner3 from "../assets/banner3.jpg";
import b6 from "../assets/b6.jpg";

export default function Home() {
  let [products, setProducts] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    getProducts().then((res) => {
      // console.log(res.data);
      if (res.data.err) {
        alert(res.data.err);
      } else {
        setProducts(res.data.products);
      }
    });
  });
  const addCart = () => {
    navigate("/login");
  };
  const shopNow = () => {
    navigate("/login");
  };
  return (
    <>
      <Nav1 />

      <Container fluid>
        <Carousel className="p-1">
          <Carousel.Item>
            <img
              className="d-block w-100"
              src={b5}
              alt="First slide"
              style={{ height: "450px", width: "100%" }}
            />
            <Carousel.Caption>
              <Button
                onClick={() => {
                  shopNow();
                }}
              >
                {" "}
                Shop Now
              </Button>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src={banner3}
              alt="First slide"
              style={{ height: "450px", width: "100%" }}
            />
            <Carousel.Caption>
              <Button
                onClick={() => {
                  shopNow();
                }}
              >
                Shop Now
              </Button>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src={b6}
              alt="First slide"
              style={{ height: "450px", width: "100%" }}
            />
            <Carousel.Caption>
              <Button
                onClick={() => {
                  shopNow();
                }}
              >
                Shop Now
              </Button>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
        <Row>
          <Col className="col-12">
            <Container fluid className="mt-3">
              <h3 className="text-center">Latest Products</h3>
              <Row>
                {products.map((item) => (
                  <Col lg={3} key={item._id}>
                    <Card className="m-2">
                      <Card.Img
                        variant="top"
                        src={`/images/${item.image}`}
                        height="200"
                      />
                      <Card.Body className="">
                        <div className="d-flex justify-content-between">
                          <Card.Title>
                            {/* <Link
                              className="text-info my-3"
                              to={`/productsdetails/${item._id}`}
                            > */}
                            {item.pname}
                            {/* </Link> */}
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
                              addCart();
                            }}
                          >
                            <b>
                              Add to cart <i className="fa fa-cart-plus"></i>
                            </b>
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

// import React from "react";
// import { Container, Card, Button } from "react-bootstrap";
// import Footer1 from "./Footer1";
// import Nav1 from "./Nav1";

// export default function Home() {
//   return (
//     <>
//       <Nav1 />
//       <Container>
//         <Card className="mt-4">
//           <Card.Header>
//             <h1>
//               <b>Neo</b>
//               <span>
//                 <b className="text-danger">STORE</b>
//               </span>
//             </h1>
//             <p>
//               Welcome to NeoStore Shopping place .This is the place when you may
//               choose the most popular shopping products you like from wide
//               variety of options
//             </p>
//           </Card.Header>
//           <Card.Body>
//             <Card.Text>
//               We're performing delivery products free of charge in case if your
//               order is highrer than 500$
//             </Card.Text>
//             <div className="d-grid gap-2">
//               <Button variant="primary" size="lg" href="/register">
//                 Sign In and Order
//               </Button>
//             </div>
//           </Card.Body>
//         </Card>
//       </Container>
//       <br />
//       <Footer1 />
//     </>
//   );
// }
