var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const mongoose = require("mongoose");

//Routers
var indexRouter = require("./routes/index");
var userRouter = require("./routes/api/user");
// var profileRouter = require("./routes/api/profile");
// var adminRouter = require("./routes/admin/admin");
// var sellRouter = require("./routes/api/sell");
// var buyRouter = require("./routes/api/buy");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

//config Routers
app.use("/", indexRouter);
app.use("/users", userRouter);
// app.use("/profile", profileRouter);
// app.use("/posts/sell", sellRouter);
// app.use("/posts/buy", buyRouter);
// app.use("/admin", adminRouter);
//Database config
const db = require("./config/database");
mongoose
  .connect(
    db.mongoURI,
    { useNewUrlParser: true }
  )
  .then(() => console.log("MongoDB connected!"))
  .catch(err => console.log(err));
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

app.listen(3000, () => console.log("Listen!"));