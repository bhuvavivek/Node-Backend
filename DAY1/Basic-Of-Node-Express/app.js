const express = require("express");
const users = require("./MOCK_DATA.json");
const fs = require("fs");

const app = express();
const PORT = 5000;

// middleware

app.use(express.urlencoded({ extended: false }));

// Routes

app.get("/api/users", (req, res) => {
  return res.json(users);
});

app.get("/users", (req, res) => {
  const html = `<ul> 
    ${users.map((user) => `<li>${user.first_name}</li>`).join("")}
  </ul>`;
  res.send(html);
});

app
  .route("/api/users/:id")
  .get((req, res) => {
    const id = Number(req.params.id);

    const user = users.find((user) => user.id == id);
    return res.json(user);
  })
  .patch((req, res) => {
    const id = Number(req.params.id);
    const body = req.body;

    const userIndex = users.findIndex((user) => user.id === id);
    users[userIndex] = { ...users[userIndex], ...body };

    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err) => {
      if (err) {
        console.error(err);
        return res
          .status(500)
          .json({ status: "error", message: "Failed to write to file" });
      }
      return res.json({ status: "success", user: users[userIndex] });
    });
  })

  .delete((req, res) => {
    // delete  a user with id

    const id = Number(req.params.id);

    const userIndex = users.findIndex((user) => user.id === id);
    const removedUsers = users.splice(userIndex, 1);
    const removedUser = removedUsers.length > 0 ? removedUsers[0] : null;

    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err) => {
      if (err) {
        console.error(err);
        return res
          .status(500)
          .json({ status: "error", message: "Failed to write to file" });
      }
      return res.json({ status: "success", user: removedUser });
    });
  });

app.post("/api/users", (req, res) => {
  const body = req.body;
  users.push({ ...body, id: users.length + 1 });
  fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err) => {
    if (err) {
      console.error(err);
      return res
        .status(500)
        .json({ status: "error", message: "Failed to write to file" });
    }
    return res.json({ status: "success", id: users.length });
  });
});

app.listen(PORT, () => {
  console.log(`Server is running at ${PORT} `);
});
