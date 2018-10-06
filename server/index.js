const express = require("express");
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
const passport = require("passport");
require("./models/User");
require("./services/passport");
const db = require("./config/keys").mongoURI;
const app = express();
const cookieKey = require("./config/keys").cookieKey;
const bodyParser = require("body-parser");
const morgan = require("morgan");

app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());
app.use(morgan("combined"));

mongoose.connect(
  db,
  err => {
    if (err) return console.log(err);
    console.log("MongoDB Connected");
  }
);

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [cookieKey]
  })
);
app.use(passport.initialize());
app.use(passport.session());

require("./routes/auth")(app);
require("./routes/payment")(app);

const PORT = process.env.PORT || 5000;

app.listen(PORT, (err, server) => {
  if (err) return console.log(err);
  console.log(`server started on ${PORT}`);
});
