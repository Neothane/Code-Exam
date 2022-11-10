var express = require("express");
var cors = require("cors");
var axios = require("axios");
var app = express();
app.use(cors());

app.get("/", function (req, res) {
  res.end("Server running at http://localhost:8081/");
});

app.get("/api/todo", function (req, res) {
  axios
    .get("https://illfatedlavendermemoryallocator--jabez007.repl.co/api/todo")
    .then(
      (result) => {
        console.log(result.data);
        res.json(result.data);
      },
      (error) => {
        console.log(error);
        res.end(error);
      }
    );
});

app.listen(8081, function () {
  console.log("Server running at http://localhost:8081/");
});
