// import React from "react";
// import Footer1 from "./Footer1";
// import Nav1 from "./Nav1";
// import { Button, Card, Container, Form, Row, Col } from "react-bootstrap";
// import { Link } from "react-router-dom";

// export default function ResetPassword() {
//   return (
//     <>
//       <Nav1 />
//       <Container className="m-auto">
//         <Row>
//           <Col
//             lg={8}
//             md={6}
//             sm={12}
//             className="p-5 m-auto shadow-sm rounded-lg"
//           >
//             <Card className="text-center m-5">
//               <Card.Header>Forgot Your Password?</Card.Header>
//               <Card.Body>
//                 <Card.Title>
//                   <Form>
//                     <Form.Group className="mb-3" controlId="formBasicEmail">
//                       <Form.Label>Email address</Form.Label>
//                       <Form.Control type="email" placeholder="Enter email" />
//                     </Form.Group>
//                   </Form>
//                 </Card.Title>
//                 <Card.Text></Card.Text>
//                 <Button variant="primary">
//                   <Link to="/recoverpassword" class="nav-link text-light">
//                     <b>Send OTP</b>
//                   </Link>
//                 </Button>
//               </Card.Body>
//             </Card>
//           </Col>
//         </Row>
//       </Container>
//       <Footer1 />
//     </>
//   );
// }

import React, { useState } from "react";
import Footer1 from "./Footer1";
import Nav2 from "./Nav2";
import { Button, Card, Container, Form, Row, Col } from "react-bootstrap";
import { sendOtp, RPassword } from "./config/Myservice";
import { useNavigate } from "react-router";

export default function ResetPassword() {
  const [email, setEmail] = useState(null);
  const [otp, setOtp] = useState(null);
  const [otpInput, setotpInput] = useState(null);
  const [pass1, setpass1] = useState();
  const [pass2, setpass2] = useState();
  const navigate = useNavigate();
  const verifyEmail = () => {
    var digits = "0123456789";
    let OTP = "";
    for (let i = 0; i < 4; i++) {
      OTP += digits[Math.floor(Math.random() * 10)];
    }
    setOtp(OTP);
    sendOtp(email, { otp: OTP });
  };
  const verifyOtp = () => {
    console.log(otp, otpInput);
    if (otp == otpInput) {
      alert("OTP Verified Successfully!");
    }
  };
  const reset = () => {
    if (pass1 != pass2) {
      alert("password not match");
    } else {
      RPassword(email, { password: pass1 }).then((res) => {
        console.log(res.data);
        alert("Password Change Successfully!");
        navigate("/login");
      });
    }
  };

  return (
    <>
      <Nav2 />
      <Container className="m-auto">
        <Row>
          <Col
            lg={8}
            md={8}
            sm={12}
            className="p-5 m-auto shadow-sm rounded-lg"
          >
            <Card className="text-center m-5">
              <Card.Header> Recover Password </Card.Header>
              <Card.Body>
                <Card.Title>
                  <Form className="p-2">
                    <Form.Group className="mb-3">
                      {/* <Form.Label>Email address</Form.Label> */}
                      <Form.Control
                        type="email"
                        onChange={(e) => {
                          setEmail(e.target.value);
                        }}
                        placeholder="Enter email"
                      />
                    </Form.Group>
                  </Form>
                </Card.Title>
                <Card.Text>
                  <Button
                    variant="primary"
                    onClick={() => {
                      verifyEmail();
                    }}
                  >
                    Send OTP
                  </Button>
                </Card.Text>
                <Card.Title>
                  <Form.Group className="mb-3">
                    {/* <Form.Label>enter otp</Form.Label> */}
                    <Form.Control
                      type="number"
                      placeholder="Enter OTP"
                      onChange={(e) => {
                        setotpInput(e.target.value);
                      }}
                    />
                  </Form.Group>
                </Card.Title>
                <Card.Text>
                  <Button
                    variant="primary"
                    onClick={() => {
                      verifyOtp();
                    }}
                  >
                    Verify OTP
                  </Button>
                </Card.Text>

                <Form.Group className="mb-3">
                  {/* <Form.Label>create password</Form.Label> */}
                  <Form.Control
                    type="password"
                    placeholder="New password"
                    onChange={(e) => {
                      setpass1(e.target.value);
                    }}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  {/* <Form.Label>Confirm password</Form.Label> */}
                  <Form.Control
                    type="password"
                    placeholder="Confirm password"
                    onChange={(e) => {
                      setpass2(e.target.value);
                    }}
                  />
                </Form.Group>

                <Button variant="primary" onClick={() => reset()}>
                  Save New Password
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      <Footer1 />
    </>
  );
}
