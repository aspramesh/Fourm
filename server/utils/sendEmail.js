const nodemailer = require('nodemailer');
const nodemailerConfig = require('./nodemailerConfig');

const sendEmail = async ({ to, subject, html }) => {
  let testAccount = await nodemailer.createTestAccount();

  const transporter = nodemailer.createTransport(nodemailerConfig);

  return transporter.sendMail({
    from: '"Ramesh" <ramesh_friendsgallary@yahoo.co.in>', 
    to,
    subject,
    html,
  });
};

module.exports = sendEmail;
