var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
//Routers
var indexRouter = require("./routes/index");
var userRouter = require("./routes/api/user");
var profileRouter = require("./routes/api/profile");
var sellRouter = require("./routes/api/sell");
var findRouter = require("./routes/api/find");
var scheduleRouter = require("./routes/admin/schedule");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

//Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
//Passport middleware
app.use(passport.initialize());
//Passport Config
require("./config/passport")(passport);
//config Routers
app.use("/", indexRouter);
app.use("/api/users", userRouter);
app.use("/api/profiles", profileRouter);
app.use("/api/sells", sellRouter);
app.use("/api/finds", findRouter); //Database config
app.use("/admin/schedule", scheduleRouter);
const db = require("./config/database");
mongoose.connect(
  db.mongoURI,
  { useNewUrlParser: true },
  err =>
    err
      ? console.log("Disconnect Database")
      : console.log("Database connected.")
);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

app.listen(3000, () => console.log("Start on port 3000."));
