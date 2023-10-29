const User = require("../models/userModel.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const SECRET_KEY = "NOTESAPI";

exports.home = (req, res) => {
  res.send("Hello World!");
};

exports.signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      throw new Error("all input fiels are required");
    }

    const userExist = await User.findOne({ email });
    if (userExist) {
      throw new Error("User already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await User.create({
      username,
      email,
      password: hashedPassword,
    });
    const token = jwt.sign({ email: result.email, id: result._id }, SECRET_KEY);
    res.status(201).json({
      success: true,
      message: "User Register Successfully",
      token: token,
      user: result,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

exports.signin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new Error("all input fields are required");
    }

    const userExist = await User.findOne({ email });
    if (!userExist) {
      return res
        .status(404)
        .json({ message: "No accoount associated with this email" });
    }

    const matchPassword = await bcrypt.compare(password, userExist.password);

    if (!matchPassword) {
      return res.status(400).json({ message: "Password is wrong" });
    }

    const token = jwt.sign(
      { email: userExist.email, id: userExist._id },
      SECRET_KEY
    );
    res
      .status(201)
      .json({
        user: userExist,
        token: token,
        message: "User login successfully",
      });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
