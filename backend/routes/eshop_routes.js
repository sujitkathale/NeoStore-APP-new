const express = require("express");
const fs = require("fs");
const jwt = require("jsonwebtoken");
const router = express.Router();
const jwtSecret = "ddsfftyy677yttfff";
const nodemailer = require("nodemailer");
const userModel = require("../db/userSchema");
const productModel = require("../db/productSchema");
const colorModal = require("../db/colorSchema");
const catModel = require("../db/categorySchema");
const orderModel = require("../db/orderSchema");

function autenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  console.log(token);
  if (token == null) {
    res.json({ err: 1, msg: "Token not match" });
  } else {
    jwt.verify(token, jwtSecret, (err, data) => {
      if (err) {
        res.json({ err: 1, msg: "Token incorrect" });
      } else {
        console.log("Match");
        next();
      }
    });
  }
}

// Register User
router.post("/register", (req, res) => {
  let email = req.body.email;
  let password = req.body.password;
  let name = req.body.name;
  let mobile = req.body.mobile;
  let address = req.body.address;
  let ins = new userModel({
    name: name,
    email: email,
    mobile: mobile,
    address: address,
    password: password,
  });
  ins.save((err) => {
    if (err) {
      res.json({ err: "User already exist" });
    }
    res.json({ msg: "Registered successfully" });
  });
});

// Login User
router.post("/login", (req, res) => {
  let email = req.body.email;
  let password = req.body.password;
  userModel.findOne({ email: email, password: password }, (err, data) => {
    if (err) {
      res.json({ err: err });
    }
    if (data === null) {
      res.json({ err: "Email or password wrong" });
    } else {
      let payload = {
        uid: email,
      };
      const token = jwt.sign(payload, jwtSecret, { expiresIn: 360000 });
      res.json({ msg: "Logged in successfully", token: token });
    }
  });
});

//get profile of logged User
router.get("/profile/:email", (req, res) => {
  let email = req.params.email;
  userModel.findOne({ email: email }, (err, data) => {
    if (err) res.json({ err: err });
    res.json({ user: data });
  });
});

//Update the profile of logged user
router.put("/updprofile/:id", (req, res) => {
  let id = req.params.id;
  let name = req.body.name;
  let email = req.body.email;
  let mobile = req.body.mobile;
  let address = req.body.address;
  let password = req.body.password;
  userModel.updateOne(
    { _id: id },
    {
      $set: {
        name: name,
        email: email,
        mobile: mobile,
        address: address,
        password: password,
      },
    },
    (err) => {
      if (err) res.json({ err: err });
      res.json({ msg: "Profile updated successfully" });
    }
  );
});

// get products
router.get("/products", autenticateToken, (req, res) => {
  productModel.find({}, (err, products) => {
    if (err) {
      res.json({ err: err });
    } else {
      res.json({ products: products });
    }
  });
});

// get product details using Id
router.get("/productdetails/:_id", (req, res) => {
  let id = req.params._id;

  productModel.findOne({ id: id }, (err, products) => {
    if (err) res.json({ err: err });
    res.json({ products: products });
  });
});

//get cart details
router.get("/cart/:item/:price/:email", (req, res) => {
  let item = req.params.item;
  let email = req.params.email;
  let price = req.params.price;
  orderModel.find(
    { pname: item, email: email, checkout: false },
    (err, data) => {
      if (err) {
        res.json({ err: err });
      }
      if (data.length === 0) {
        let ins_order = new orderModel({
          pname: item,
          email: email,
          price: price,
          quantity: 1,
          checkout: false,
        });
        ins_order.save((err) => {
          if (err) {
            res.json({ err: err });
          }
          res.json({ msg: "Product ordered successfully" });
        });
      } else {
        orderModel.updateMany(
          { pname: item },
          { $inc: { quantity: +1 } },
          (err) => {
            if (err) throw err;
            res.json({ msg: "Product incremented successfully" });
          }
        );
      }
    }
  );
});

// get order details
router.get("/orders/:email", (req, res) => {
  let email = req.params.email;
  orderModel.find({ email: email, checkout: false }, (err, data) => {
    if (err) {
      res.json({ err: err });
    }
    if (data.length === 0) {
      res.json({ msg: "Orders are not placed" });
    } else {
      res.json({ orders: data });
    }
  });
});

// delete product from cart
router.delete("/deleteorder/:id", (req, res) => {
  let id = req.params.id;
  orderModel.deleteOne({ _id: id }, (err) => {
    if (err) throw err;
    res.json({ msg: "Product deleted successfully" });
  });
});

// checkout
router.get("/checkout/:email", (req, res) => {
  let email = req.params.email;
  orderModel.updateMany(
    { email: email, checkout: false },
    { $set: { checkout: true } },
    (err) => {
      if (err) throw err;
      res.json({ msg: "Updated successfully" });
    }
  );
});

//get all orders details
router.get("/allorders/:email", (req, res) => {
  let email = req.params.email;
  orderModel.find({ email: email }, (err, data) => {
    if (err) {
      res.json({ err: err });
    }
    if (data.length === 0) {
      res.json({ msg: "Orders are not placed" });
    } else {
      res.json({ orders: data });
    }
  });
});
//send email for recover password
router.post("/email/:email", (req, res) => {
  console.log(req.params.email, req.body);
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    auth: {
      user: "neosoftdemo1999@gmail.com",
      pass: "NeoStore@1999",
    },
  });
  //get OTP
  var mailOption = {
    from: "neosoftdemo1999@gmail.com",
    to: req.params.email,
    subject: "Password Recovery Request",
    text: "OTP for Account verification",
    html: `
    OTP : ${req.body.otp}
    `,
  };
  setTimeout(() => {
    transporter.sendMail(mailOption);
  }, 2000);
});

router.put("/resetpass/:email", async (req, res) => {
  console.log(req.body, req.params.email);
  let x = await userModel.findOneAndUpdate(
    { email: req.params.email },
    req.body
  );
  await x.save();
  res.send("password updated");
});

module.exports = router;
