const nodeMailer = require('../config/nodemailer');

exports.newMailer = (user)=>{
    console.log(user.email);
    console.log('inside the node mailer');
    let htmlString = nodeMailer.renderTemlete({user: user}, "/forgetpassport/forgetpassword.ejs")
    
    nodeMailer.transporter.sendMail({
        from: "nodeathentication@gmail.com",
        to: user.email,
        subject: "new comment publish",
        html: htmlString
    }, function(err, info){
        if(err){
            console.log("error in sending email", err);
            return;
        }

        console.log("massage send ", info);
        return;
    })
}