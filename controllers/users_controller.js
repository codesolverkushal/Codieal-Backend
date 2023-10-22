const User = require('../models/user');
const { use } = require('../routes');
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

module.exports.createSession = async (req,res)=>{
    
    try{
    //find the user 
    const existingUser = await User.findOne({email:req.body.email});
     //handle user found
    if(existingUser){
        //handle password which don't match
        if(existingUser.password != req.body.password){
            return res.status(400).send('Bhai password to sahi daal');
        }
         //handle session creation

         res.cookie('user_id',existingUser.id);
         return res.redirect('/users/profile');
    }
    else{
        res.status(404).send('Kya bhai sign-up bhi nhi kiya hai? karlo bhai rupaya nhi lag rha...')
    }
    } catch (error){
        console.error('Error during signin:', error);
        return res.status(500).send("An error occurred during signin");
    }
         
         
              
               

}