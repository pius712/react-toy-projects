const express = require("express");
const cors = require("cors");
const passport = require("passport");
const dotenv = require("dotenv");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const postRouter = require("./routes/post");
const userRouter = require("./routes/user");
const hashtagRouter = require("./routes/hashtag");
const db = require("./models");
const passportConfig = require("./passport");
const path = require("path");
const hpp = require("hpp");
const helmet = require("helmet");
dotenv.config();

const app = express();
db.sequelize
  .sync()
  .then(() => {
    console.log("database connected");
  })
  .catch((err) => {
    console.log(err);
  });
passportConfig();

if (process.env.NODE_ENV === "production") {
  app.use(morgan("combined"));
  app.use(helmet());
  app.use(hpp());
} else {
  app.use(morgan("dev"));
}
app.use(
  cors({
    origin: ["http://localhost:80", "http://fittil.com"],
    credentials: true,
  })
);

app.use("/", express.static(path.join(__dirname, "uploads")));
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(cookieParser(process.env.COOKIE_SECRET));
// 쿠키를 이 secret key를 바탕으로 만들어준다.
app.use(
  session({
    saveUninitialized: false,
    resave: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
      httpOnly: true,
      secure: false,
      domain: process.env.NODE_ENV === "production" && ".fittil.com",
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use("/post", postRouter);
app.use("/user", userRouter);
app.use("/hashtag", hashtagRouter);
// app.use((err,req,res,next)=>{

// })
app.listen(80, () => {
  console.log("8080 server listening");
});
