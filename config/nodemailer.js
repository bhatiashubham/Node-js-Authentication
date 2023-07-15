const nodemailer = require("nodemailer");
const path = require("path");
const ejs = require("ejs");




let transporter = nodemailer.createTransport({
    Service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: "nodeathentication@gmail.com", // generated ethereal user
      pass: "fdlhpcojcoeauwrq"// generated ethereal password
    },
  });

let renderTemlete = (data, relativePath)=>{
    let mailHTML;
    ejs.renderFile(
        path.join(__dirname, '../views/mailers', relativePath),
        data,
        function(err, tamplate){
            if(err){
              console.log('err in rendering email', err);
            }
            mailHTML = tamplate;
        }
    )
    return mailHTML;
}

module.exports = {
  transporter: transporter,
  renderTemlete: renderTemlete
}