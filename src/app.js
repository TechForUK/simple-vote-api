const express = require('express');
const bodyParser = require('body-parser');

const signBasicForm = require('./signBasicForm.js');
const signPostalForm = require('./signPostalForm.js');
const signEuForm = require('./signEuForm.js');
const sendEmail = require('./sendEmail.js');
const validation = require('./validation.js');

const app = express();
app.use(bodyParser.json());
const port = 4000;

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.get('/', (req, res) => res.send('Hello World!'));

app.post('/register', (req, res) => {
  const { userData } = req.body;

  if (validation(userData))
  {
    const pdfDocuments = [];

    switch(userData.userType) {
    case 'uk_citizen_in_uk':
      pdfDocuments.push(signBasicForm(userData));
      break;
    case 'eu_citizen_in_uk':
      pdfDocuments.push(signBasicForm(userData));
      pdfDocuments.push(signEuForm(userData));
      break;
        // case 'uk_citizen_abroad':
        //   pdfDocuments.push(signBasicForm(userData));
        //   break;
    }
    if (userData.postalVote){
      pdfDocuments.push(signPostalForm(userData));
    }
    //for testing we are setting toEmail to fromEmail
    sendEmail(pdfDocuments,userData.email, userData.email, userData.firstName + ' ' + userData.surname);

  }
  res.sendStatus(200);
});



app.listen(port, () => console.log(`Example app listening on port ${port}!`));
