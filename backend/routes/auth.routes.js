const { Router } = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");
const config = require("config");
const router = Router();
const User = require("../models/user.js");

router.post(
  "/register",
  [
    check("email", "wrong email type").isEmail,
    check(
      "password",
      "Your password should be at least 8 characters"
    ).isLength({ min: 8 })
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: "check input data"
        });
      }
      const { email, password } = req.body;
      const candidate = await User.findOne({ email });
      if (candidate) {
        return (
          res.status(400), json({ message: "this email address already used" })
        );
      }
      const hashedPassword = await bcrypt.hash(password, config.get("salt"));
      const user = new User({ email, password: hashedPassword });
      await user.save();
      res.status(201).json({ message: "user created" });
    } catch (e) {
      res.status(500).json({ message: "something wrong" });
    }
  }
);

router.post(
  "login",
  [
    check("email", "Type valid email address").normalizeEmail().isEmail,
    check("password", "Type your password").exists()
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: "Password is wrong or non-existing user"
        });
      }
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: "user not found" });
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: "wrong password" });
      }
      const token = jwt.sign({ userid: user.id }, config.get("jwtSecret"), {
        expiresIn: "1h"
      });
      res.json({ token, userId: user.id });
    } catch (e) {
      res.status(500).json({ message: "something wrong" });
    }
  }
);

module.exports = router;
