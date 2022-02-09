import React, { useState, useEffect } from "react";
import Nav2 from "./Nav2";
import { getAllOrder } from "./config/Myservice";
import { Container, Table, Card } from "react-bootstrap";
import Footer1 from "./Footer1";
export default function Allorder() {
  let [orders, setOrders] = useState([]);

  //get all order details
  useEffect(() => {
    getAllOrder(sessionStorage.getItem("user")).then((res) => {
      if (res.data.orders) {
        setOrders(res.data.orders);
      }
    });
  });
  return (
    <>
      <Nav2 />
      <Container>
        <h4>All orders</h4>
        <Table striped bordered hover className="mt-3">
          <thead>
            <tr>
              <th>Sr.no</th>
              <th>Product Image</th>
              <th>Product name</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((itm, ind) => {
              return (
                <tr key={itm.id}>
                  <td>{ind + 1}</td>
                  <td>
                    <img
                      variant="top"
                      src={`/images/${itm.image}`}
                      width="200px"
                      height="100px"
                    />
                  </td>
                  <td>{itm.pname}</td>
                  <td>${itm.price}</td>
                  <td>{itm.quantity}</td>
                  <td>
                    {itm.checkout
                      ? "Order Delivered Successfully"
                      : "Yet to be delivered"}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </Container>
      <Footer1 />
    </>
  );
}
