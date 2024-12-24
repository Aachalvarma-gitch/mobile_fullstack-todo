const asyncHandler = require("express-async-handler")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const Admin = require("../models/Admin")
const Employee = require("../models/Employee")

exports.adminRegister = asyncHandler(async (req, res) => {
    const { password } = req.body
    const hash = await bcrypt.hash(password, 10)
    await Admin.create({ ...req.body, password: hash })
    res.json({ message: "admin register success" })
})
exports.adminLogin = asyncHandler(async (req, res) => {
    // verify email
    const { email, password } = req.body
    const result = await Admin.findOne({ email })
    if (!result) {
        return res.status(401).json({ message: "email not found" })
    }
    // verify password
    const verify = await bcrypt.compare(password, result.password)
    if (!verify) {
        return res.status(401).json({ message: "password do not match" })
    }
    // create token and send cookie
    const token = jwt.sign({ _id: result._id }, process.env.JWT_SECRET)
    res.cookie("todo-admin", token, {
        maxAge: 1000 * 60 * 60 * 24,
        httpOnly: true,
        secure: process.env.NODE_ENV === "prod" ? true : false
    })
    res.json({
        message: "admin login success", result: {
            name: result.name,
            email: result.email
        }
    })
})
exports.adminLogout = asyncHandler(async (req, res) => {
    res.clearCookie("todo-admin")
    res.json({ message: "admin logout success" })
})


exports.employeeRegister = asyncHandler(async (req, res) => {
    const { name, email } = req.body
    const password = name.slice(0, 2) + email.slice(0, 2)
    const hash = await bcrypt.hash(password, 10)
    await Employee.create({ ...req.body, password: hash })
    res.json({ message: "employee register success" })
})
exports.employeeLogin = asyncHandler(async (req, res) => {
    // verify email
    const { email, password } = req.body
    const result = await Employee.findOne({ email })
    if (!result) {
        res.status(401).json({ message: "email not found" })
    }
    // verify password
    const verify = await bcrypt.compare(password, result.password)
    if (!verify) {
        res.status(401).json({ message: "password do not match" })
    }
    // create token and send cookie
    const token = jwt.sign({ _id: result._id }, process.env.JWT_SECRET)
    res.cookie("todo-admin", token, {
        maxAge: 1000 * 60 * 60 * 24,
        httpOnly: true,
        secure: process.env.NODE_ENV === "prod" ? true : false
    })
    res.json({
        message: "employee login success", result: {
            name: result.name,
            email: result.email
        }
    })
})
exports.employeeLogout = asyncHandler(async (req, res) => {
    res.clearCookie("todo-admin")
    res.json({ message: "employee logout success" })
})

