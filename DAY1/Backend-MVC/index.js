const express = require("express");

const { connectMongoDb } = require("./db/connection");
const { logReqRes } = require("./middlewares");
const userRouter = require("./routes/user");
const app = express();
const PORT = 8000;

// connect mongodb
connectMongoDb("mongodb://127.0.0.1:27017/Backend-MVC")
  .then(() => console.log("mongodb connected"))
  .catch((err) => console.log(err));

// middleware - Plugin
app.use(express.urlencoded({ extended: false }));
app.use(express.json({ extended: false }));

app.use(logReqRes("log.txt"));

// routes
app.use("/api/users", userRouter);

// listening to server
app.listen(PORT, () => {
  console.log(`Server is running at ${PORT} `);
});
