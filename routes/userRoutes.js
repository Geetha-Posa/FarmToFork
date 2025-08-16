const express = require("express");
const router = express.Router();
const { signup, signin, registerUser, loginUser } = require("../controllers/userController");

// signup route (farmer or consumer)
router.post("/signup", registerUser);

// signin route (farmer or consumer)
router.post("/signin", loginUser);

module.exports = router; 
