const { readEmployeeTodo, completeEmployeeTodo } = require("../controller/employee.controller")

const router = require("express").Router()

router
    .get("/read/todos", readEmployeeTodo)
    .put("/update/todos/:tid", completeEmployeeTodo)
module.exports = router