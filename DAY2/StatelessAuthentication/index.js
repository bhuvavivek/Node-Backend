const express = require("express");
const cookieParser = require("cookie-parser");

const { connectMongoDb } = require("./db/connection");
const { restrictToLoggedinUserOnly } = require("./middlewares/auth");
const userRoute = require("./routes/user");
const app = express();
const PORT = 8000;

// connect mongodb
connectMongoDb("mongodb://127.0.0.1:27017/Authentications")
  .then(() => console.log("mongodb connected"))
  .catch((err) => console.log(err));

// middleware - Plugin
app.use(express.json());
app.use(cookieParser());

// routes
app.use("/url", restrictToLoggedinUserOnly, userRoute);

// listening to server
app.listen(PORT, () => {
  console.log(`Server is running at ${PORT} `);
});
