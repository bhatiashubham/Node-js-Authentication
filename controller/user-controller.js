let User = require('../models/user');
let userMailer = require('../Mailer/user_mailer');
let forgetMailer = require('../Mailer/forgetemail');
let resetMailer = require('../Mailer/resetpassword')
let jwt = require('jsonwebtoken');
const date = require('date-and-time')


module.exports.Signin = (req, res)=>{
    return res.render("Signin",{
        title: "signin"
    })
}
module.exports.Signup = (req, res)=>{
    return res.render("Signup",{
        title: "signup"
    })
}
module.exports.Create = async (req, res)=>{
    console.log(req.body);

    if (req.body.password !== req.body.confrom_password) {
        return res.redirect('back');
    }

    try {
        let user = await User.findOne({ email: req.body.email });

        if (!user) {
            await User.create({email: req.body.email, password: req.body.password, name: req.body.name});
            req.flash('success', 'signup success');
            res.redirect('/');
        } else {
            return res.redirect('back');
        }
    } catch (err) {
        console.log('Failed to create user', err);
        return res.redirect('back');
    }  
    
}
module.exports.createsession = (req, res)=>{
    req.flash('success', 'signin success');
    userMailer.newMailer(req.user);
    return res.redirect('/');
}
module.exports.Forgetpassword = (req, res)=>{
    return res.render("forgetpassword",{
        title: "forget password"
    })
}
module.exports.sendemailfoegetpasword = async(req, res)=>{
    try {
        let user = await User.findOne({email: req.body.email});
        if(user){
    
            forgetMailer.newMailer(user);
            user.save();
            req.flash('success', 'forgetpassword mail is send');
            return res.redirect('/user/signin');
        }
    } catch (err) {
        console.log(err);
    }
}
module.exports.UpdatePassword =async (req, res)=>{
    let user = await User.findOne({_id: req.params.id});
    return res.render("updatepassword",{
        title: "updatepassword",
        user: user
    })
}
module.exports.UpdatePassword1 =async (req, res)=>{
    console.log(req.body.password, req.body.confrom_password)
    try{
        let user = await User.findOne({email: req.body.email});
        console.log(user)
        // if(!user.token){
        //     return res.status(400).send('token isnoi vaild');
        // }
        if (req.body.password !== req.body.confrom_password) {
            console.log("cheak password");
            return res.redirect('back');
            
        }
    
    // let user = await User.findById(req.params.id);
    // console.log(req.body.password, req.user.password)
    user.password = req.body.password;
    user.save();
    // req.user.token.delete();
    console.log('sucssess');
    res.redirect('back')
    }catch(err){
        console.log(err)
    }
}
module.exports.destroyession = async function(req, res){
    req.logout(
        function(err){
            if(err){
                console.log(err);
            }
        }
    );
    req.flash('success', 'logout success');
    

    return res.redirect('/');
}
module.exports.resetpassword = async function(req, res){
    // let user = await User.findOne(req.params.id);
    // console.log(req.user.email);
    const now  =  new Date();
    const value = date.format(now,'YYYYMMDDHHmmss');
    req.user.password = value;
    req.user.save();
    resetMailer.newMailer(req.user);
    req.flash('success', 'resetpassword send in your email');
    return res.redirect('back')
}