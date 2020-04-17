const express = require("express")
const app = express()

app.use(app.router)

app.get("/users/:name", (req, res) => {
    res.send('hello' + req.params.name)
})

app.listen(3000)

console.log("server starting.....")