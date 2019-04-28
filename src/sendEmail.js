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

  //console.log( attach );

  const msg = {
  to: toEmail,
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


}

module.exports = sendEmail;







