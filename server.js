const express = require("express");
const connectDB = require("./config/db");

const app = express();

connectDB();

app.set("view engine", "ejs");
app.use(express.static("public"));

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

// Products
app.get("/products", (req, res) => {
    res.render("products");
});

// Product Details
app.get("/product", (req, res) => {
    res.render("product");
});

// Register
app.get("/register", (req, res) => {
    res.render("register");
});

// Login
app.get("/login", (req, res) => {
    res.render("login");
});

// Add To Cart
app.get("/add-to-cart/:id", (req, res) => {
    const id = parseInt(req.params.id);

    const product = products.find(
        p => p.id === id
    );

    if (product) {
        cart.push(product);
    }

    res.redirect("/cart");
});

// Cart
app.get("/cart", (req, res) => {
    res.render("cart", { cart });
});

// Remove Item
app.get("/remove/:id", (req, res) => {
    const id = parseInt(req.params.id);

    const index = cart.findIndex(
        item => item.id === id
    );

    if (index !== -1) {
        cart.splice(index, 1);
    }

    res.redirect("/cart");
});

// Checkout
app.get("/checkout", (req, res) => {
    res.render("checkout");
});

// Success
app.get("/success", (req, res) => {
    cart = [];
    res.render("success");
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});