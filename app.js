//mongoose
//body-parser
//express
//nodemon

const bodyParser = require("body-parser");

const express = require("express");
const app = express();

const mongoose = require("mongoose");
const wordModels = require("./Models/Schema");

var cors = require("cors");
app.use(cors());

const dbCon = (db) => {
  mongoose
    .connect(db)
    .then(() => {
      console.log("bağlandı");
    })
    .catch(() => {
      console.log("bağlanmadı");
    });
};
dbCon("mongodb://localhost/zeynep");

var jsonParser = bodyParser.json();
app.use(bodyParser.json());

var urlencodedParser = bodyParser.urlencoded({ extended: false });
app.use(bodyParser.urlencoded({ extended: false }));

app.post("/", function (req, res) {
  console.log(req.body, "req");
  let form = req.body;
  if (form != null) {
    const ab = new wordModels({
      words: form.words,
      font: form.font,
      colors: form.colors,
    });
    ab.save((err, data) => {
      if (err) {
        res.json(err);
      }
      if (data) {
        console.log("kayıt başarılı");
        res.json(data._id);
      }
    });
  }
});

app.get("/", async function (req, res) {
  const dataRes = await wordModels.find({ _id: req.query?.id });
  res.json(dataRes);
  console.log(dataRes, "aa");
});

app.listen(5000);
