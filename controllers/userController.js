const User = require("../models/user");

// Sign Up (farmer or consumer)
exports.registerUser = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;

    // check role
    if (!["farmer", "consumer"].includes(role)) {
      return res.status(400).json({ message: "Role must be farmer or consumer" });
    }

    // check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const newUser = new User({ username, email, password, role });
    await newUser.save();
//exclude the password from reponse
    const userSafe = {
      _id: newUser._id,
      username: newUser.username,
      email: newUser.email,
      role: newUser.role
    };

    res.status(201).json({ message: `${role} registered successfully`, user: userSafe });
  } catch (error) {
    res.status(500).json({ message: "Error registering user", error: error.message });
  }
};

// Sign In
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email, password });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Exclude password from response
    const userSafe = {
      _id: user._id,
      username: user.username,
      email: user.email,
      role: user.role
    };

    res.status(200).json({ message: `${user.role} logged in successfully`,user: userSafe });
  } catch (error) {
    res.status(500).json({ message: "Error logging in", error: error.message });
  }
};
