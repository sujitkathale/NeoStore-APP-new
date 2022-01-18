import React, { useState } from "react";
import { Container, Form, Row, Col, Button } from "react-bootstrap";
import Nav1 from "./Nav1";
import { loginUser } from "./config/Myservice";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import Footer1 from "./Footer1";
import GoogleLogin from "react-google-login";
import FacebookLogin from "react-facebook-login";
import axios from "axios";
const regForEmail = RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);

export default function Login() {
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");

  const navigate = useNavigate();
  const login = () => {
    let data = { email: email, password: password };
    loginUser(data).then((res) => {
      if (res.data.err) {
        alert(res.data.err);
      } else {
        alert(res.data.msg);
        console.log(res.data);
        localStorage.setItem("_token", res.data.token);
        sessionStorage.setItem("user", email);
        navigate("/dashboard");
      }
    });
  };
  const responseSuccessGoogle = (response) => {
    console.log(response);
    axios({
      method: "POST",
      url: "http://localhost:8000/api/googlelogin",
      data: { tokenId: response.tokenId },
    }).then((response) => {
      console.log(response);
      navigate("/dashboard");
    });
  };

  const responseErrorGoogle = (response) => {};
  const responseFacebook = (response) => {};
  return (
    <>
      <Nav1 />
      <Container
        className="mt-5 py-2 shadow-lg"
        // style={{ border: "4px solid gray" }}
      >
        <h1 className="text-center">
          <b>Neo</b>
          <span>
            <b className="text-danger">STORE</b>
          </span>{" "}
          <b>Login</b>
        </h1>
        <Row className="py-3">
          <Col
            lg={5}
            md={6}
            sm={12}
            className="p-4 m-auto shadow-lg bg-dark rounded-lg text-center"
          >
            {/* <h4>Social Login </h4> */}
            <Col className="my-4 ">
              <GoogleLogin
                clientId="856073956695-c205rdmnhisbhe0eqlgnjh8vjpt6mo1n.apps.googleusercontent.com"
                buttonText="Login with Google"
                onSuccess={responseSuccessGoogle}
                onFailure={responseErrorGoogle}
                cookiePolicy={"single_host_origin"}
                className="px-4 py-3 pr-5"
              />
            </Col>
            <Col className="">
              <FacebookLogin
                appId="432899141756645"
                autoLoad={true}
                callback={responseFacebook}
              />
            </Col>
          </Col>
          <Col
            lg={5}
            md={6}
            sm={12}
            className="p-4 px-5  m-auto shadow-lg bg-dark rounded-lg"
          >
            <Form>
              <Form.Group as={Row} className="mb-3 text-white">
                <Form.Label>Email</Form.Label>

                <Form.Control
                  type="text"
                  placeholder="Enter Emailid"
                  name="email"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
                {email != "" && !regForEmail.test(email) && (
                  <span className="text-danger">Enter email correctly</span>
                )}
              </Form.Group>

              <Form.Group as={Row} className="mb-3 text-white">
                <Form.Label>Password</Form.Label>

                <Form.Control
                  type="password"
                  placeholder="Password"
                  name="password"
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
                {password != "" && password.length < 8 && (
                  <span className="text-danger">Enter password correctly</span>
                )}
              </Form.Group>
              <Row>
                <Button variant="primary" onClick={login}>
                  Login
                </Button>
                <Link to="/forgetpassword" class="nav-link text-danger">
                  <b>Forget Password</b>
                </Link>
              </Row>
            </Form>
          </Col>
        </Row>
      </Container>
      <br />
      <Footer1 />
    </>
  );
}
