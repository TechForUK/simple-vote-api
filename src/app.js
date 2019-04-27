const express = require('express')
const bodyParser = require('body-parser')
const pdf = require("./pdf.js");
const app = express()
app.use(bodyParser.json());
const port = 3000

app.get('/', (req, res) => res.send('Hello World!'))

app.post('/register', (req, res) => {
    console.log(req.body)
    //console.log(greetings.sayHelloInEnglish())
    pdf.signRegisterEnglandWalesPdf()
    res.sendStatus(200)
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))