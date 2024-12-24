const { adminRegister, adminLogin, adminLogout, employeeRegister, employeeLogin, employeeLogout } = require("../controller/auth.controller")
const { adminProtected } = require("../middleware/protected.middleware")

const router = require("express").Router()

router
    .post("/admin/register", adminRegister)
    .post("/admin/login", adminLogin)
    .post("/admin/logout", adminLogout)


    .post("/employee/register", adminProtected, employeeRegister)
    .post("/employee/login", employeeLogin)
    .post("/employee/logout", employeeLogout)

module.exports = router

