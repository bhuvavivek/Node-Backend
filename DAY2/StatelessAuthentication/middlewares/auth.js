const { GetUser } = require("../service/auth");

async function restrictToLoggedinUserOnly(req, res, next) {
  const userUid = req.cookies?.uid;
  if (!userUid) return res.status(401).json({ message: "Unauthorized" });

  user = GetUser(userUid);

  if (!user) return res.status(404).json({ message: "User Not Found" });

  //   i provide user to the req object so that it can be accessed in the next middleware
  req.user = user;
  next();
}

module.exports = { restrictToLoggedinUserOnly, chceckAuth };
