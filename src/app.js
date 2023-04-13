const path = require("path");
const express = require("express");
const hbs = require("hbs");
const forecast = require("./utils/forecast");
const geocode = require("./utils/geocode");

// console.log(__dirname);
// console.log(path.join(__dirname, "../public"));

const app = express();

//define paths
const publicDirPath = path.join(__dirname, "../public");
//by default hbs search for views folder for rendering
// we can change it
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

//setup handelbar engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

//static directory serve
app.use(express.static(publicDirPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "weather app",
    name: "Abhishek Dongare",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "about page",
    name: "Abhishek Dongare",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "help page",
    msg: "your website work perfectly fine",
    name: "Abhishek Dongare",
  });
});

// app.get("/help", (req, res) => {
//   res.send({ name: "abhishek", age: 21 });
// });

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide a address",
    });
  }
  const address = req.query.address;
  geocode(address, (error, { latitude, longitude, location } = {}) => {
    if (error) {
      return res.send({ error: error });
    }
    forecast(latitude, longitude, (error, { condition, temperature } = {}) => {
      if (error) {
        res.send({ error: error });
      } else {
        res.send({
          location: location,
          forecast:
            "It is " + condition + " And it's temperature is " + temperature,
          temperature,
        });
      }
    });
  });
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({ error: "you must provide  a search term" });
  }
  console.log(req.query);
  res.send({ products: [] });
});

app.get("/help/*", (req, res) => {
  res.render("ErrorPage", {
    title: "404",
    errormsg: "Help article not found",
    name: "abhishek Dongare",
  });
});

app.get("*", (req, res) => {
  res.render("Errorpage", {
    title: 404,
    errormsg: "404 page not found",
    name: "abhishek",
  });
});

app.listen(3000, () => {
  console.log("server is up on port 3000");
});
