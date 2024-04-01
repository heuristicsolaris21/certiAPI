const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');
const app = express();
app.use(express.json());


const imageSchema = new mongoose.Schema({
  name: String,
  date: String,
  fathername: String,
  url: String,
});
const Image = mongoose.model("images", imageSchema);

const taxSchema = new mongoose.Schema({
  userId:String,
  name: String,
  waterTax:{
    newBillNo: String,
    oldBillNo: String,
    amountDue: String,
  },
  propertyTax:{
    newBillNo: String,
    oldBillNo: String,
    amountDue: String,
  }
});
const TaxDetails = mongoose.model("taxes", taxSchema);

app.use(cors());

app.get("/getCertificates", async (req, res) => {
    try {
      const images = await Image.find();
      res.status(200).json(images);
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  });

app.get("/getCertificate", async (req, res) => {
  try {
    const date = req.query.date;
    const images = await Image.find({ date });
    res.status(200).json(images);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});


app.get("/getTaxDetails", async (req, res) => {
  try {
    const userId = req.query.userId;
    const tax = await TaxDetails.find({ userId });
    res.status(200).json(tax);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});



app.post("/addCertificate", async (req, res) => {
  try {
    const image = new Image({
      name: req.body.name,
      date: req.body.date,
      fathername: req.body.fathername,
      url: req.body.url,
    });
    await image.save();
    res.send("Certificate added");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

mongoose.connect(
    "mongodb://shamlinlearning:zJuHgQMxwcKWlB8B@ac-08dhk2y-shard-00-00.n6hxill.mongodb.net:27017,ac-08dhk2y-shard-00-01.n6hxill.mongodb.net:27017,ac-08dhk2y-shard-00-02.n6hxill.mongodb.net:27017/certificates?ssl=true&replicaSet=atlas-pww4uv-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Zander"
    // u s e   this type of connection string (NodeJS version 2.2.12)in mongoDB Atlas
    // "mongodb://localhost:27017/bikeAPI",
    ).then(console.log("Connected to MongoDB !")
);

app.listen(8080, ()=>{
    console.log("Server started at port 8080");
});