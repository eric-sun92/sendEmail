require("dotenv").config();
const nodemailer = require("nodemailer");
const sgMail = require("@sendgrid/mail");

const sendEmailEthereal = async (req, res) => {
  const testAccount = await nodemailer.createTestAccount();

  const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    auth: {
      user: "landen.blick@ethereal.email",
      pass: "SVTpw6UeeZBfvWMADJ",
    },
  });

  let info = await transporter.sendMail({
    from: '"Coding Addict" <codingaddict@gamil.com',
    to: "bar@example.com",
    subject: "hello",
    html: "<h2>Sending Emails with NodeJS</h2>",
  });

  res.json({ info });
};

const sendEmail = async (req, res) => {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  const msg = {
    to: "eric.sun.ecs92@yale.edu",
    from: "ericnpssun@gmail.com",
    subject: "test email",
    text: "this is sent by NodeJS by SendGrid",
    html: "<h1>Yay!</h1>",
  };
  const info = await sgMail.send(msg);
  res.json(info);
};

module.exports = sendEmail;
