const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
const { isValid } = require("../util/validation");

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ handle: req.body.handle });
    if (!user) res.status(404).send({ error: { handle: "User not found" } });
    const isvalidPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (isvalidPassword) {
      const token = jwt.sign(
        {
          _id: user._id,
          handle: user.handle,
          username: user.username,
          followers: user.followers,
          followings: user.followings,
        },
        process.env.SECRET_KEY,
        { expiresIn: "12h" }
      );
      res.send(token);
    } else {
      res.status(400).send({ error: { password: "Wrong password" } });
    }
  } catch (err) {
    res.status(500).send(err);
  }
});

router.post("/signup", async (req, res) => {
  try {
    const { username, password, handle } = req.body;
    const { valid, error } = isValid(username, password, handle);
    if (!valid) {
      res.send({ error });
    }
    const alreadyUser = await User.findOne({ handle: req.body.handle });
    if (!alreadyUser) {
      const hashPassword = await bcrypt.hash(password, 10);
      const newUser = new User({
        username: username,
        handle: handle,
        password: hashPassword,
      });
      const user = await newUser.save();
      res.send(user._id);
    } else {
      res.send({ error: { handle: "Already exists" } });
    }
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
