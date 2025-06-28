const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const bcrypt = require("bcryptjs");
const path = require("path");
const User = require("./models/User");
const Url = require("./models/shorturl");
require("dotenv").config();

const app = express();

// ✅ MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.error("❌ MongoDB connection error:", err));

// ✅ Middlewares
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public')); // for serving static files if needed

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(session({
  secret: 'your_secret_key',
  resave: false,
  saveUninitialized: false
}));

// ✅ Middleware to check authentication
function isAuthenticated(req, res, next) {
  if (req.session.userId) return next();
  res.redirect('/login');
}

// ✅ Signup page
app.get('/signup', (req, res) => {
  res.render('signup');
});

// ✅ Signup handler
app.post('/signup', async (req, res) => {
  const { email, contact, password } = req.body;
  try {
    await User.create({ email, contact, password });
    res.redirect('/login');
  } catch (err) {
    res.send('❌ Email already used or invalid input.');
  }
});

// ✅ Login page
app.get('/login', (req, res) => {
  res.render('login');
});

// ✅ Login handler
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && await bcrypt.compare(password, user.password)) {
    req.session.userId = user._id;
    res.redirect('/');
  } else {
    res.send('❌ Invalid credentials.');
  }
});

// ✅ Logout
app.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/login');
});

// ✅ Home (protected) - show all URLs
app.get("/", isAuthenticated, async (req, res) => {
  const urls = await Url.find();
  res.render("index", { urls });
});

// ✅ Shrink URL (protected)
app.post("/", isAuthenticated, async (req, res) => {
  const fullUrl = req.body.fullurl;
  await Url.create({ full: fullUrl });
  res.redirect("/");
});

// ✅ Redirect using short URL
app.get("/:shortId", async (req, res) => {
  const shortUrl = await Url.findOne({ short: req.params.shortId });
  if (!shortUrl) return res.sendStatus(404);

  shortUrl.clicks++;
  await shortUrl.save();
  res.redirect(shortUrl.full);
});

// ✅ Delete a URL (protected)
app.post("/delete/:id", isAuthenticated, async (req, res) => {
  await Url.findByIdAndDelete(req.params.id);
  res.redirect("/");
});

// ✅ Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
