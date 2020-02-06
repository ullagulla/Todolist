const mongoose = require("mongoose");


const schemaTodo = new mongoose.Schema(
    {
        text: {type: String, required: true, min: 5},
        date: { type: Date,  default: Date.now }, 
        author: { type: String }
    }
)

const Todo = mongoose.model("Todo", schemaTodo);

module.exports = Todo;