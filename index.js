const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const postRoute = require("./routes/posts");
const cors = require("cors");

dotenv.config();

mongoose.connect(process.env.DATABASE_URL, () => {
  console.log("Mongodb connected");
});

// Middleware
app.use(cors());
app.use(express.json());

app.use("/api/user", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/post", postRoute);

app.get("/", (req, res) => {
  res.send("Welcome home!");
});

app.listen(process.env.PORT || 4000, () => {
  console.log("server is running");
});
