const express = require('express');
const bodyParser = require('body-parser');

const signBasicForm = require('./signBasicForm.js');
const signPostalForm = require('./signPostalForm.js');
const signEuForm = require('./signEuForm.js');
const sendEmail = require('./sendEmail.js');

const app = express();
app.use(bodyParser.json());
const port = 3000;

app.get('/', (req, res) => res.send('Hello World!'));

app.post('/register', (req, res) => {
  const { userData } = req.body;
  const basicFormPdf = signBasicForm(userData);
  const postalFormPdf = signPostalForm(userData);
  const euFormPdf = signEuForm(userData);
  sendEmail([basicFormPdf, postalFormPdf, euFormPdf],toEmail, fromEmail);
  res.sendStatus(200);
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
