const mongoose = require("mongoose");


const schemaTodo = new mongoose.Schema(
    {
        text: {type: String, required: true, minlength: 5},
    }
)

const Todo = mongoose.model("Todo", schemaTodo);

module.exports = Todo;