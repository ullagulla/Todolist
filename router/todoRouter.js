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
    const sorted = req.query.sort;
    const todos = await Todo.find().sort({text:sorted})
    res.render("todo", {
        todos
    })
})

router.get("/delete/:id", async (req, res)=> { //Tar bort data från databasen
    console.log(req.params.id);
    await Todo.deleteOne({_id:req.params.id}); //MÅSTE vara ett objekt {} och databas-nyckeln. Databas-nyckeln finns i compass el atlas
    res.redirect("/todo");
});

router.get("/edit/:id", async (req, res) =>{ //Uppdaterar data

    const response = await Todo.findById({_id:req.params.id});

    res.render("edit", {response});
});

router.post("/edit/:id", async (req, res) =>{ //Skickar uppdaterad data till comment routen

    await Todo.updateOne({_id:req.params.id}, {$set: {text: req.body.text}}, {runValidators: true})
    res.redirect("/todo");
})

module.exports = router;