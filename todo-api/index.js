var express = require("express");
var cors = require("cors");
var axios = require("axios");
var bodyParser = require("body-parser");
var app = express();
app.use(cors());
app.use(bodyParser.json());

app.get("/", function (req, res) {
  res.end("Server running at http://localhost:8081/");
});

const apiUrl = "https://illfatedlavendermemoryallocator--jabez007.repl.co/api";

app.get("/api/todo", async function (req, res) {
  let todoResponse = await axios.get(apiUrl + "/todo");
  res.json(todoResponse.data);
});

app.put("/api/todo/", async function (req, res) {
  if (req.body.id) await axios.delete(apiUrl + "/todo/" + req.body.id);
  await axios.post(apiUrl + "/todo/", req.body);
  res.end();
});

app.delete("/api/todo/:id", async function (req, res) {
  await axios.delete(apiUrl + "/todo/" + req.params.id);
  res.end();
});

app.listen(8081, function () {
  console.log("Server running at http://localhost:8081/");
});
