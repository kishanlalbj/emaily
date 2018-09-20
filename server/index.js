const express = require("express");
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
const passport = require("passport");
const cookieKey = require("./config/keys").cookieKey;
require("./models/User");
require("./services/passport");
const db = require("./config/keys").mongoURI;
const app = express();

mongoose.connect(
  db,
  err => {
    if (err) return console.log(err);
    console.log("MongoDB Connected");
  }
);

app.use(passport.initialize());
app.use(passport.session());
app.use(
  cookieSession({
    maxAge: 2000,
    keys: [cookieKey]
  })
);

require("./routes/auth")(app);

const PORT = process.env.PORT || 5000;

app.listen(PORT, (err, server) => {
  if (err) return console.log(err);
  console.log(`server started on ${PORT}`);
});
