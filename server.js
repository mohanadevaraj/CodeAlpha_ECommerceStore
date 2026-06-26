require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const User = require("./config/models/User");

const app = express();

// Connect Database
connectDB();

// Middlewares
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

// Products
const products = [
  {
    id: 1,
    name: "Gaming Laptop",
    price: 59999
  },
  {
    id: 2,
    name: "Smart Phone",
    price: 24999
  },
  {
    id: 3,
    name: "Wireless Earbuds",
    price: 2999
  }
];

// Cart
let cart = [];

// Home
app.get("/", (req, res) => {
  res.render("home");
});

// Products Page
app.get("/products", (req, res) => {
  res.render("products", { products });
});

// Product Details
app.get("/product", (req, res) => {
  res.render("product");
});

// ================= REGISTER =================

// Register Page
app.get("/register", (req, res) => {
  res.render("register");
});

// Save User
app.post("/register", async (req, res) => {
  try {
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    });

    await user.save();

    res.render("registersuccess");
  } catch (error) {
    console.log(error);
    res.send("Registration Failed");
  }
});

// ================= LOGIN =================

app.get("/login", (req, res) => {
  res.render("login");
});

// ================= CART =================

// Add To Cart
app.get("/add-to-cart/:id", (req, res) => {
  const id = parseInt(req.params.id);

  const product = products.find(
    (p) => p.id === id
  );

  if (product) {
    cart.push(product);
  }

  res.redirect("/cart");
});

// Cart Page
app.get("/cart", (req, res) => {
  res.render("cart", { cart });
});

// Remove Item
app.get("/remove/:id", (req, res) => {
  const id = parseInt(req.params.id);

  const index = cart.findIndex(
    (item) => item.id === id
  );

  if (index !== -1) {
    cart.splice(index, 1);
  }

  res.redirect("/cart");
});

// ================= CHECKOUT =================

app.get("/checkout", (req, res) => {
  res.render("checkout");
});

// Success Page
app.get("/success", (req, res) => {
  cart = [];
  res.render("success");
});

// Start Server
app.listen(3000, () => {
  console.log("Server running on port 3000");
});