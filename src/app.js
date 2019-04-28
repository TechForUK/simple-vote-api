const express = require('express');
const bodyParser = require('body-parser');

const signBasicForm = require('./signBasicForm.js');
const signPostalForm = require('./signPostalForm.js');
const signEuForm = require('./signEuForm.js');
const sendEmail = require('./sendEmail.js');
const validation = require('./validation.js');

const app = express();
app.use(bodyParser.json());
const port = 3000;

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
          //pdfDocuments.push(signBasicForm(userData));
          //pdfDocuments.push(signEuForm(userData));
          break;
        // case 'uk_citizen_abroad':
        //   pdfDocuments.push(signBasicForm(userData));
        //   break;
      }
      if (userData.postalVote){
          pdfDocuments.push(signPostalForm(userData));
      }
  }
  //sendEmail(pdfDocuments,userData.toEmail, userData.fromEmail, userData.firstName + ' ' + userData.surname);
  res.sendStatus(200);
});



app.listen(port, () => console.log(`Example app listening on port ${port}!`));
