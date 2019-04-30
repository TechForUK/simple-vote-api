const signBasicForm = require('./src/signBasicForm.js');
const signPostalForm = require('./src/signPostalForm.js');
const signEuForm = require('./src/signEuForm.js');
const sendEmail = require('./src/sendEmail.js');
const validation = require('./src/validation.js');

exports.fillAndSignForms = (req, res) => {
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
    }
    if (userData.postalVote){
      pdfDocuments.push(signPostalForm(userData));
    }
    //for testing we are setting toEmail to fromEmail
    sendEmail(pdfDocuments,userData.email, userData.email, userData.firstName + ' ' + userData.surname);

  }
  res.sendStatus(200);
};
