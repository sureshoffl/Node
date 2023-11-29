const nodemailer = require('nodemailer');

const authController = require('../controller/authController')

module.exports.sendingmail = async (props) =>{
const transporter =  nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'ssureshoffl@gmail.com',
      pass: 'kpbf yzuz hiyy kole'
    }
  });
  
  const { to, subject, text} = props
  var mailOptions = {
    from: 'ssureshoffl@gmail.com',
    to: to,
    subject: subject,
    text: text,
    attachments : [{}]
  };
  
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}


  