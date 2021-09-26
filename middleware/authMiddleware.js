var jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  const token = req.header("Authorization");
  if (!token) {
    return res.status(401).send({ error: { denied: "Access Denied" } });
  }
  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    if (decoded.exp * 60 * 60 < Date.now()) {
      res.status(401).send({ error: { expired: "Token expired" } });
    }
    next();
  } catch (err) {
    res.status(500).send(err);
  }
};
