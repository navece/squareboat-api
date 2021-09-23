const router = require("express").Router();
const Post = require("../models/Post");
const User = require("../models/User");

//TODO: get timeline

router.get("/timeline/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const userPosts = await Post.find({ userId: user._id });
    const followingPosts = await Promise.all(
      user.followings.map((followingId) => {
        return Post.find({ userId: followingId });
      })
    );
    res.send(userPosts.concat(...followingPosts));
  } catch (err) {
    res.status(500).send(err);
  }
});

//TODO: create a post

router.post("/", async (req, res) => {
  const newPost = new Post({
    userId: req.body.userId,
    content: req.body.content,
  });
  try {
    const post = await newPost.save();
    res.send(post);
  } catch (err) {
    res.status(500).send(err);
  }
});

//TODO: get a post

router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.send(post);
  } catch (err) {
    res.status(500).send(err);
  }
});

//TODO: update a post

router.put("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.userId === req.body.userId) {
      await post.updateOne({ $set: req.body });
      res.send("post has been updated");
    } else {
      res.status(403).send("you cannot update others post");
    }
  } catch (err) {
    res.status(500).send(err);
  }
});

//TODO: delete a post

router.delete("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.userId === req.body.userId) {
      await post.deleteOne();
      res.send("post has been deleted");
    } else {
      res.status(403).send("you cannot delete others post");
    }
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
