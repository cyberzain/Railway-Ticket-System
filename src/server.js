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
app.use("/api/train", require("./routes/trainRoutes.js"));
app.get("/login", (req, res) => {
  res.render("login");
});
//db connection
const dbConnect = require('./config/db');
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

const trainRoute  = require("./model/trainRoutes.js");
const addRoute = async()=>{
  const dummyData = [
  {
    "fromStation": "Mumbai",
    "toStation": "Pune",
    "distance": 192,
    "jTime": "2026-01-15T06:00:00.000Z",
    "trainRoute": 101
  },
  {
    "fromStation": "Pune",
    "toStation": "Nagpur",
    "distance": 721,
    "jTime": "2026-01-15T18:30:00.000Z",
    "trainRoute": 102
  },
  {
    "fromStation": "Mumbai",
    "toStation": "Delhi",
    "distance": 1384,
    "jTime": "2026-01-16T08:15:00.000Z",
    "trainRoute": 103
  },
  {
    "fromStation": "Hyderabad",
    "toStation": "Bengaluru",
    "distance": 569,
    "jTime": "2026-01-16T22:45:00.000Z",
    "trainRoute": 104
  },
  {
    "fromStation": "Chennai",
    "toStation": "Coimbatore",
    "distance": 497,
    "jTime": "2026-01-17T05:30:00.000Z",
    "trainRoute": 105
  },
  {
    "fromStation": "Kolkata",
    "toStation": "Patna",
    "distance": 532,
    "jTime": "2026-01-17T14:20:00.000Z",
    "trainRoute": 106
  },
  {
    "fromStation": "Ahmedabad",
    "toStation": "Jaipur",
    "distance": 657,
    "jTime": "2026-01-18T07:10:00.000Z",
    "trainRoute": 107
  },
  {
    "fromStation": "Bhopal",
    "toStation": "Indore",
    "distance": 194,
    "jTime": "2026-01-18T17:40:00.000Z",
    "trainRoute": 108
  },
  {
    "fromStation": "Lucknow",
    "toStation": "Varanasi",
    "distance": 286,
    "jTime": "2026-01-19T09:00:00.000Z",
    "trainRoute": 109
  },
  {
    "fromStation": "Parbhani",
    "toStation": "Aurangabad",
    "distance": 191,
    "jTime": "2026-01-19T16:15:00.000Z",
    "trainRoute": 110
  }
];

 await trainRoute.insertMany(dummyData);
 console.log("added successfully");

}


// addRoute();


app.listen(PORT, () => {
  dbConnect();
  console.log(`Server is running on port ${PORT}`);
});