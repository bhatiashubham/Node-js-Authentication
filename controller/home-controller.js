let User = require('../models/user');
module.exports.Home = async (req, res)=>{
        return res.render('Home', {
        title: "home"
    })
}