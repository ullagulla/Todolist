const express = require("express");
const Todo = require("../model/todo")

const router = express.Router();

router.get("/", (req, res)=>{
    res.render("todo");
});

router.post("/createtodo", async (req, res)=>{
    const todo = new Todo({
        text: req.body.text
    })
    await todo.save((error, success)=>{
        if (error) {
            res.send(error._message)
        }
        else
        res.redirect("/todo")
    })
})

router.get("/todo", async (req, res)=>{
    const todos = await Todo.find()
    res.render("todo", {
        todos
    })
})


module.exports = router;