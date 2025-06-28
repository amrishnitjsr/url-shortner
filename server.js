const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const Url = require("./shorturl");
const bodyParser = require("body-parser");
require("dotenv").config(); // Loads .env variables

const app = express();

// 🔌 Connect to MongoDB Atlas
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ Connected to MongoDB"))
.catch(err => console.error("❌ MongoDB connection failed:", err));

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// 🏠 Show all URLs
app.get("/", async (req, res) => {
  const urls = await Url.find();
  res.render("index", { urls });
});

// 📩 Handle form POST request
app.post("/", async (req, res) => {
  const fullUrl = req.body.fullurl;
  await Url.create({ full: fullUrl });
  res.redirect("/");
});

// 🔁 Handle redirect from short URL
app.get("/:shortId", async (req, res) => {
  const shortUrl = await Url.findOne({ short: req.params.shortId });
  if (!shortUrl) return res.sendStatus(404);

  shortUrl.clicks++;
  await shortUrl.save();

  res.redirect(shortUrl.full);
});
app.post("/delete/:id", async (req, res) => {
  await Url.findByIdAndDelete(req.params.id);
  res.redirect("/");
});


app.listen(process.env.PORT || 5000, () => {
  console.log("🚀 Server running on http://localhost:5000");
});
