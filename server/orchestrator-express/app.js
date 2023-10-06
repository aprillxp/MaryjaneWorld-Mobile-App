const express = require("express");
const cors = require("cors");
const router = require("./routes");
const app = express();
const port = process.env.PORT || 4000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use(router);

app.listen(port, () => {
  console.log(`I love you ${port}`);
});