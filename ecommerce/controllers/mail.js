var nodemailer = require('nodemailer')

exports.sendMail = (req) =>{

  process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;
  
  //console.log('realllllllll body-----------------------',req.query.userEmail)
   userEmail = req.query.userEmail
  //console.log('userEmail------------------------',userEmail)
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'ghassanmalik17@gmail.com',
      pass: 'coolguy1717'
    }
  });
  
  //console.log('---------------------- yes Enteredddd')
      var mailOptions = {
        from: 'ghassanmalik17@gmail.com',
        to: userEmail,
        subject: 'Sending Dynamic Email using Node.js',
        text: 'Finally done it!'
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });

}
