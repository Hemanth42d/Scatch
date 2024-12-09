const express = require("express");
const cookieParser =  require("cookie-parser");
const path =require("path");

const db = require("./config/mongoose-connection.js");

const ownersRouter = require("./routes/ownersRouter.js");
const usersRouter = require("./routes/usersRouter.js");
const productsRouter = require("./routes/productsRouter.js");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended : true }));
app.use(express.static(path.join(__dirname + "public")));
app.use(cookieParser());
app.set("view engine", "ejs");

app.use("/owners", ownersRouter);
app.use("/users", usersRouter);
app.use("/products", productsRouter);

app.listen(3000, () => {
    console.log(`port is running at https://localhost:${3000}`);
});