const config = require("./config/config");
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const todoRouter = require("./router/todoRouter");
const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, "css")));//path.join tar mappen som heter public(eller css). Där ska alla SCSS, CSS och bilder finnas
app.set("view engine", "ejs");

//router 
app.use(todoRouter);

//listen to port 
const port = process.env.PORT || 8200;

const options = {
    useUnifiedTopology: true,
    useNewUrlParser: true
}
mongoose.connect(config.databaseURL, options).then(() => {
    console.log("OMG it's working <3")
    //app is listening to port 
    app.listen(port);
});
