const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));

// 🔹 Temporary storage (memory only)
let users = [];

// Show Registration Form
app.get("/", (req, res) => {
    res.render("form", { errors: {}, old: {} });
});

// Handle Form Submission
app.post("/register", (req, res) => {
    const { name, email, username, password } = req.body;

    let errors = {};

    // Validation
    if (!name.trim()) errors.name = "Name is required";
    if (!email.trim()) errors.email = "Email is required";
    if (!username.trim()) errors.username = "Username is required";
    if (!password.trim()) errors.password = "Password is required";

    // If errors → show form again
    if (Object.keys(errors).length > 0) {
        return res.render("form", { errors, old: req.body });
    }

    // Store temporarily
    users.push({ name, email, username });

    // Show success page
    res.render("success", { name });
});

// Start Server
app.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});
