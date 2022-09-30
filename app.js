const express = require("express")
const app = express()
const data = require("./data.json")
const projects = data.projects

app.set("view engine", "pug")

app.use("/static", express.static("public"))

app.get("/", (req, res) => {
    res.render("index", { projects })
})

app.get("/about", (req, res) => {
    res.render("about")
})

app.get("/project:id", (req, res, next) => {
    let id = req.params.id - 1
    if (id < projects.length & id >= 0) {
        let project = projects[id]
        res.render("project", { project })
    } else {
        next()
    }
})

// 404 error handler
// Sets the message and status of the error and passes error to global error handler
app.use((req, res, next) => {
    const err = new Error("Sorry, this page does not exist.")
    err.status = 404
    next(err)
})

// Global error handler
// Renders the error template with the error status and message
app.use((err, req, res, next) => {
    console.log(`${err.message} - Status: ${err.status}`)
    if (err.status === 404) {
        res.render("page-not-found", { err })
    } else {
        res.locals.error = err
        res.status(err.status)
        res.render("error", { err })
    }
})

app.listen(3000, () => {
    console.log("Application listening on port 3000")
})