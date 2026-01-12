const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');

const app = express();

require('dotenv').config();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
//set ejs
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use("views", express.static("views"));
app.use(morgan('dev'));

const PORT = process.env.PORT || 5000;
app
app.use("/api/auth", require("./routes/auth.js"));
app.use("/", require("./routes/ui/publicRoutes.js"))

const jwt = require('./middleware/jwt');
app.use(jwt);

//ui routes
app.use("/", require("./routes/ui/routes.js"));

app.get("/login", (req, res) => {
  res.render("login");
});
//db connection
const dbConnect = require('./config/db');
app.get('/', (req, res) => {
  res.send('Hello, World!');
});








app.listen(PORT, () => {
  dbConnect();
  console.log(`Server is running on port ${PORT}`);
});