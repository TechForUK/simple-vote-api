const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

function sendEmail(files, toEmail, fromEmail, name) {


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
    from: { email : 'register@simple.getvoting.org' , name: name},
    reply_to: fromEmail,
    cc: fromEmail,
    subject: 'Please add me to the electoral register',
    text: 'Hello,\n\nPlease add me to the elecoral register. I\'ve attached all the relevant forms.\n\nBest regards,\n\n'+name,
    attachments: attach,
  };



  sgMail.send(msg)
    .then(function(){
      console.log('Email sent successfully');
    }).catch(function(e){
      console.log('Failed to send email');
      console.log(e.message);
    });

  // const msg2 = {
  //   to: fromEmail,
  //   from: 'no-reply@getvoting.org',
  //   subject: 'Your vote registration email was sent',
  //   text: 'Hello,\n\nThanks a lot for using our voter registration app. The following documents were sent on your behalf to your local electoral body.\n\nHappy voting,\n\nThe Best for Britain team',
  //   attachments: attach,
  // };

  // sgMail.send(msg2)
  //   .then(function(){
  //     console.log('Email sent successfully');
  //   }).catch(function(e){
  //     console.log('Failed to send email');
  //     console.log(e.message);
  //   });

}

module.exports = sendEmail;
