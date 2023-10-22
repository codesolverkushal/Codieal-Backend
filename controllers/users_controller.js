const User = require('../models/user');
module.exports.profile = function(req, res){
    return res.render('user_profile', {
        title: 'User Profile'
    })
}

//render the sign up page
module.exports.signUp = function(req,res){
    return res.render('user_sign_up',{
        title:"Codeial | Sign Up"
    })
}

//render the sign in page
module.exports.signIn = function(req,res){
    return res.render('user_sign_in',{
        title:"Codeial | Sign Up"
    })
}

//get the sign up data

module.exports.create = async (req,res)=>{
    try {
        if (req.body.password !== req.body.confirm_password) {
            return res.status(400).send("Password and confirm password do not match");
        }

        const existingUser = await User.findOne({ email: req.body.email });
        if (existingUser) {
            return res.status(409).send("A user with this email already exists");
        }

        const newUser = await User.create(req.body);
        return res.redirect('/users/sign-in');
    } catch (error) {
        console.error('Error during signup:', error);
        return res.status(500).send("An error occurred during signup");
    }
}

module.exports.createSession = function(req,res){
    //todo later
    
}