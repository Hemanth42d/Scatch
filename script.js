const express = require("express");
const cookieParser =  require("cookie-parser");
const path =require("path");
const dbgr = require("debug")("development:script.js");
// const expressSession = require("express-session");
// const flash = require("connect-flash");

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
// app.use(
//     expressSession({
//         resave : false,
//         saveUninitialized : false,
//         secret : process.env.EXPRESS_SESSION_SECRET
//     })
// );
// app.use(flash());

app.use("/", indexRouter);
app.use("/owners", ownersRouter);
app.use("/users", usersRouter);
app.use("/products", productsRouter);

//code to remove

app.get("/create/products", (req,res) => {
    res.render("createProducts")
})

app.get("/admin", (req,res) => {
    res.render("admin")
})

app.get("/cart", (req,res) => {
    res.render("cart")
})


app.listen(3000, () => {
    dbgr(`port is running at https://localhost:${3000}`);
});