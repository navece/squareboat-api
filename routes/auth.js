const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ handle: req.body.handle });
    if (!user) res.status(404).send("User not found");
    const isvalidPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    isvalidPassword ? res.send(user) : res.status(400).send("Wrong password");
  } catch (err) {
    res.status(500).send(err);
  }
});

router.post("/signup", async (req, res) => {
  try {
    const hashPassword = await bcrypt.hash(req.body.password, 10);
    const newUser = new User({
      username: req.body.username,
      handle: req.body.handle,
      password: hashPassword,
    });
    const user = await newUser.save();
    res.send(user);
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
