const signBasicForm = require('./src/signBasicForm.js');
const signPostalForm = require('./src/signPostalForm.js');
const signEuForm = require('./src/signEuForm.js');
const sendEmail = require('./src/sendEmail.js');
const validation = require('./src/validation.js');

exports.fillAndSignForms = (req, res) => {
  res.set('Access-Control-Allow-Origin', 'https://simple.getvoting.org');

  if (req.method === 'OPTIONS') {
    // Send response to OPTIONS requests
    res.set('Access-Control-Allow-Methods', 'POST');
    res.set('Access-Control-Allow-Headers', 'Content-Type');
    res.set('Access-Control-Max-Age', '3600');
    res.sendStatus(204);
  } else {
    const { userData, electoralOfficeEmail } = req.body;
    console.log(electoralOfficeEmail);

    if (validation(userData)) {
      console.log('Validation passed');
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
      console.log('Sending email');
      //for testing we are setting toEmail to fromEmail
      sendEmail(pdfDocuments,userData.email, userData.email, userData.firstName + ' ' + userData.surname);
      console.log('Email sent');
    } else {
      console.log('Validation failed');
    }
  }

  res.sendStatus(200);
};
