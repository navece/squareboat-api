const router = require("express").Router();
const User = require("../models/User");

// TODO: get all user
router.get("/all", async (req, res) => {
  try {
    let users = await User.find();
    for (let i = 0; i < users.length; i++) {
      users[i] = {
        id: users[i]._id,
        username: users[i].username,
        handle: users[i].handle,
        profilePicture: users[i].profilePicture,
        status: users[i].status,
      };
    }
    res.send(users);
  } catch (err) {
    res.status(500).send(err);
  }
});

//TODO: get a user

router.get("/:id", async (req, res) => {
  try {
    let user = await User.findById(req.params.id);
    res.send(user);
  } catch (err) {
    res.status(500).send(err);
  }
});

//TODO: follow
router.put("/:id/follow", async (req, res) => {
  //userId is my id
  // id is id of which i want to follow
  if (req.body.userId === req.params.id) {
    res.status(403).send("You can't follow yourself");
  } else {
    try {
      const user = await User.findById(req.params.id);
      const currentUser = await User.findById(req.body.userId);
      if (user.followers.includes(req.body.userId)) {
        res.status(403).send("already following");
      } else {
        await user.updateOne({ $push: { followers: req.body.userId } });
        await currentUser.updateOne({ $push: { followings: req.params.id } });
        res.status(200).send("user has been followed");
      }
    } catch (err) {
      res.status(500).send(err);
    }
  }
});
//TODO: unfollow
router.put("/:id/unfollow", async (req, res) => {
  //userId is my id
  // id is id of which i want to follow
  if (req.body.userId === req.params.id) {
    res.status(403).send("You can't unfollow yourself");
  } else {
    try {
      const user = await User.findById(req.params.id);
      const currentUser = await User.findById(req.body.userId);
      if (user.followers.includes(req.body.userId)) {
        await user.updateOne({ $pull: { followers: req.body.userId } });
        await currentUser.updateOne({ $pull: { followings: req.params.id } });
        res.status(200).send("user has been unfollowed");
      } else {
        res.status(403).send("already unfollowed");
      }
    } catch (err) {
      res.status(500).send(err);
    }
  }
});

module.exports = router;
