const express = require("express");
const users = require("../users/routes");
const { run } = require("./config/mongo");
const app = express();
const port = process.env.PORT || 4001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(users);

run().then((db) => {
  app.listen(port, () => {
    console.log(`I love you ${port}`);
  });
});
