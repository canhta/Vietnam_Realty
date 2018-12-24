var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const session = require("express-session");
//Routers
var indexRouter = require("./routes/index");
var userRouter = require("./routes/api/user");
var profileRouter = require("./routes/api/profile");
var sellRouter = require("./routes/api/sell");
var findRouter = require("./routes/api/find");
var scheduleFINDRouter = require("./routes/admin/schedule/schFind");
var scheduleSELLRouter = require("./routes/admin/schedule/schSell");
var managerRouter = require("./routes/admin/manager/maUser");
const db = require("./config/database");
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

//Session Config
app.use(
  session({
    secret: db.secretOfKey,
    resave: true,
    saveUninitialized: true
  })
);
//config Routers
app.use("/", indexRouter, express.static(path.join(__dirname, "public")));

app.use(
  "/api/users",
  userRouter,
  express.static(path.join(__dirname, "public"))
);
app.use(
  "/api/profiles",
  profileRouter,
  express.static(path.join(__dirname, "public"))
);

app.use(
  "/api/sells",
  sellRouter,
  express.static(path.join(__dirname, "public"))
);
app.use(express.static(path.join(__dirname, "public")));
app.use(
  "/api/finds",
  findRouter,
  express.static(path.join(__dirname, "public"))
); //Database config
app.use(
  "/admin/schedule/finds",
  scheduleFINDRouter,
  express.static(path.join(__dirname, "public/admin"))
);
app.use(
  "/admin/schedule/sells",
  scheduleSELLRouter,
  express.static(path.join(__dirname, "public/admin"))
);

app.use(
  "/admin/manager",
  managerRouter,
  express.static(path.join(__dirname, "public/admin"))
);

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

const PORT = 5000;
app.listen(PORT, () => console.log(`Start on port ${PORT}`));
