const nodemailer = require("nodemailer");
require("dotenv").config();

const { EMAIL_PASSWORD } = process.env;

const config = {
  host: "smtp.meta.ua",
  port: 465,
  secure: true,
  auth: {
    user: "ivanedokhodiuk@meta.ua",
    pass: EMAIL_PASSWORD,
  },
};

const transporter = nodemailer.createTransport(config);

const sendEmail = (data) => {
  transporter.sendMail({ ...data, from: "ivanedokhodiuk@meta.ua" });

  return true;
};

module.exports = sendEmail;
