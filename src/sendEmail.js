const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

//sendEmail([pdfData, pdfData],'phil.mohr@gmail.com', 'philmohr@gmail.com', 'Tom Miller');


function sendEmail(files, toEmail, fromEmail, name) {
  //console.log(files);

  var attach = [];
  var arrayLength = files.length;
  for (var i = 0; i < arrayLength; i++) {
    attach.push({
      content : files[i],
      filename : 'file' + (i + 1) + '.pdf'
    });
  }


  const msg = {
    to: toEmail,
    //cc: fromEmail,
    from: fromEmail,
    subject: 'Please register me for voting in the EU elections',
    text: 'Hello,\n\nPlease register me for Voting. See attached.\n\nBest regards,\n\n'+name,
    //html: '<strong>and easy to do anywhere, even with Node.js</strong>',
    attachments: attach,
  };



  sgMail.send(msg)
    .then(function(output){
      console.log(output);
    }).catch(function(e){
      console.log(e.message);
    });

  const msg2 = {
    to: toEmail,
    //cc: fromEmail,
    from: fromEmail,
    subject: 'Vote registration eamil was sent',
    text: 'Hello,\n\nThanks a lot for using our vote registration app. The following attachements were sent on your behalf\n\nHappy voting,\n\nThe Best for Britain team',
    //html: '<strong>and easy to do anywhere, even with Node.js</strong>',
    attachments: attach,
  };

  sgMail.send(msg2)
    .then(function(output){
      console.log(output);
    }).catch(function(e){
      console.log(e.message);
    });

}

module.exports = sendEmail;







