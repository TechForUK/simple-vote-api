function sendEmail(files, toEmail, from Email) {
  console.log(files);
  // const sgMail = require('@sendgrid/mail');
  // sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  // const msg = {
  //   to: 'recipient@example.org',
  //   from: 'sender@example.org',
  //   subject: 'Hello attachment',
  //   html: '<p>Here’s an attachment for you!</p>',
  //   attachments: [{
  //     content: 'Some base 64 encoded attachment content',
  //     filename: 'some-attachment.txt',
  //     type: 'plain/text',
  //     disposition: 'attachment',
  //     contentId: 'mytext'
  //   }, ],
  // };
}

module.exports = sendEmail;
