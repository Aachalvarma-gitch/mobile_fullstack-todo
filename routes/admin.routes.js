const { readTodo, createTodo, updateTodo, deleteTodo, getAllEmployee } = require("../controller/admin.controller")

const router = require("express").Router()

router
    .get("/read/todos", readTodo)
    .post("/create/todos", createTodo)
    .put("/update/todos/:tid", updateTodo)
    .delete("/delete/todos/:tid", deleteTodo)
    .get("/get/employee", getAllEmployee)
module.exports = router