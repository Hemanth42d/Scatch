const express = require("express");
const cookieParser =  require("cookie-parser");
const path =require("path");
const dbgr = require("debug")("development:script.js");
const ownersRouter = require("./routes/ownersRouter.js");
const usersRouter = require("./routes/usersRouter.js");
const productsRouter = require("./routes/productsRouter.js");
const indexRouter = require("./routes/index.js")

const db = require("./config/mongoose-connection.js");
require("dotenv").config();


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended : true }));
// app.use(express.static(path.join(__dirname + "public")));
app.use(express.static('public'));
app.use(cookieParser());
app.set("view engine", "ejs");


app.use("/", indexRouter);
app.use("/owners", ownersRouter);
app.use("/users", usersRouter);
app.use("/products", productsRouter);


app.listen(3000, () => {
    dbgr(`port is running at https://localhost:${3000}`);
});