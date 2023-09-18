const routes = require('express').Router();
const User = require('../modules/users')
const bcrypt = require('bcrypt');

routes.post('/register', async (req, res) => {
    try {
        //generate new password
        const salt = await bcrypt.genSalt(10);
        const hashedpassword = await bcrypt.hash(req.body.password, salt);

        // create new user
        const newuser = await new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedpassword
        });

        // save the data of the user
        const user = await newuser.save();
        res.status(200).json(user);
        res.send("It done");
    } catch (err) {
            res.status(500).json(err);
    }
});

routes.post('/login',async (req,res)=>{
    try{
        const loginuser=await User.findOne({email:req.body.email})
        !loginuser && res.status(404).json("user not found");

        const validpassword=await bcrypt.compare(req.body.password,loginuser.password)
        !validpassword && res.status(400).json("bad request")

        res.status(200).json(loginuser);
    }catch(err){
        res.status(500).json(err);
    }
});

module.exports = routes;