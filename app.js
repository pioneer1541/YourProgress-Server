const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const indexRouter = require("./routes/index");
const registerRouter = require("./routes/register");
const loginRouter = require('./routes/login')
const taskRouter = require('./routes/tasks')
require("dotenv").config();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use((req, res, next) => {
  // Website you wish to allow to connect
  res.setHeader("Access-Control-Allow-Origin", "*");

  // Request methods you wish to allow
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  // Request headers you wish to allow
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type,auth",
  );

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader("Access-Control-Allow-Credentials", true);

  // Pass to next layer of middleware
  next();
});

app.use(indexRouter);
app.use(registerRouter);
app.use(loginRouter);
// app.use('/task/',auth.auth)
app.use(taskRouter);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(
    `Server is listening on port: ${PORT},server address: http://localhost:${PORT}/`
  );
});
