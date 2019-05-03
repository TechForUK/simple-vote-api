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
    from: 'register@simple.getvoting.org',
    cc: fromEmail,
    subject: 'Request to be added to the electoral register',
    text: `Hello,\n\nWe're  forwarding you a request to add ${name} to the elecotral register. All their relevant forms have been attached. \n\nPromoted by Best for Britain, the campaign name of UK-EU OPEN POLICY LIMITED registered at International House, 24 Holborn Viaduct, London, EC1A 2BN. Best for Britain is registered with The Electoral Commission.`,
    attachments: attach,
  };



  sgMail.send(msg)
    .then(function(){
      console.log('Email sent successfully');
    }).catch(function(e){
      console.log('Failed to send email');
      console.log(e.message);
    });


  const msg2 = {
    to: fromEmail,
    from: 'no-reply@getvoting.org',
    subject: 'Your vote registration email was sent',
    text: 'Hello,\n\nThanks a lot for using our voter registration app. The following documents were sent on your behalf to your local electoral body.\nIf you don\'t hear back from your electoral office within a day please forward them these documents manually.\n\nHappy voting,\n\nThe Best for Britain team\n\nPromoted by Best for Britain, the campaign name of UK-EU OPEN POLICY LIMITED registered at International House, 24 Holborn Viaduct, London, EC1A 2BN. Best for Britain is registered with The Electoral Commission.',
    attachments: attach,
  };

  sgMail.send(msg2)
    .then(function(){
      console.log('Email sent successfully');
    }).catch(function(e){
      console.log('Failed to send email');
      console.log(e.message);
    });


}

module.exports = sendEmail;
