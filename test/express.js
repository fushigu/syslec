const express = require('express')
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.get('/', (req, res) => {
    res.send('hello')
})
app.post('/', (req, res) => {
    res.send({'greeting': 'goodbye'})
    const data = req.body;
    console.log(data)
})

app.listen(3000)