const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

let latestData = {};
let history = [];

app.post("/data", (req, res) => {
  latestData = req.body;

  history.push({
    ...req.body,
    time: Date.now()
  });

  if (history.length > 500) history.shift();

  res.sendStatus(200);
});

app.get("/data", (req, res) => {
  res.json(latestData);
});

app.get("/history", (req, res) => {
  res.json(history);
});

app.use(express.static("public"));

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});