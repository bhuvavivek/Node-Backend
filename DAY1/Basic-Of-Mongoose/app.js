const express = require("express");

const mongoose = require("mongoose");

const app = express();
const PORT = 5000;

// connect mongodb
mongoose
  .connect("mongodb://127.0.0.1:27017/basicOfMongoose")
  .then(() => console.log("mongodb connected"))
  .catch((err) => console.log(err));

// create a user Schema
const userSchema = new mongoose.Schema({ timestamps: true });

// create a model

const User = mongoose.model("user ", userSchema);

// middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json({ extended: false }));

// Routes

app.get("/api/users", async (req, res) => {
  const alldbUsers = await User.find({});
  return res.json(alldbUsers);
});

app.get("/users", async (req, res) => {
  const alldbUsers = await User.find({});
  const html = `<ul> 
    ${alldbUsers.map((user) => `<li>${user.firstName}</li>`).join("")}
  </ul>`;
  res.send(html);
});

app
  .route("/api/users/:id")
  .get(async (req, res) => {
    const user = await User.findById(req.params.id);
    return res.json(user);
  })
  .patch(async (req, res) => {
    // can u update a user model with id

    const id = req.params.id;
    const body = req.body;

    const user = await User.findByIdAndUpdate(id, body, { new: true });
    return res.json({ status: "success", user: user });
  })

  .delete(async (req, res) => {
    // delete  a user with id
    const user = await User.findByIdAndDelete(req.params.id, req.body);
    return res.json({ status: "success", user: user });
  });

app.post("/api/users", async (req, res) => {
  const body = req.body;

  if (
    !body ||
    !body.firstName ||
    !body.email ||
    !body.lastName ||
    !body.gender ||
    !body.jobTitle
  ) {
    return res
      .status(400)
      .json({ status: "error", msg: "All fields are Required" });
  }

  const result = await User.create({
    firstName: body.firstName,
    lastName: body.lastName,
    email: body.email,
    gender: body.gender,
    jobTitle: body.jobTitle,
  });

  console.log(result);
  res.status(201).json({ staus: "success", user: result });
});

app.listen(PORT, () => {
  console.log(`Server is running at ${PORT} `);
});
