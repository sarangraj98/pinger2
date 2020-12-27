const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require('../models/User');
const dotenv = require('dotenv');
const Log = require('../models/Log');
const { route } = require("./urlActions");
dotenv.config()

router.post("/login", (req, res) => {
    console.log(req.body)
    const email = req.body.email;
    const password = req.body.password;
    User.findOne({ email }).then(user => {
        if (!user) {
            return res.status(404).json({ emailnotfound: "Email not found" });
        }
        bcrypt.compare(password, user.password).then(isMatch => {
            if (isMatch) {
                const payload = {
                    id: user._id,
                    name: user.name
                };
                const token = jwt.sign(payload,process.env.JWT_KEY);
                res.send({Success:true,token:token})
            } else {
                return res
                    .status(400)
                    .json({ passwordincorrect: "Password incorrect" });
            }
        });
    });
});

router.post("/register", (req, res) => {
    User.findOne({ email: req.body.email }).then(user => {
        if (user) {
            return res.status(400).json({ email: "Email already exists" });
        } else {
            const newUser = new User({
                email: req.body.email,
                password: req.body.password
            });
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) throw err;
                    newUser.password = hash;
                    newUser
                        .save()
                        .then(user => res.send('Success'))
                        .catch(err => console.log(err));
                });
            });
        }
    });
});

router.post('/deleteLog',async(req,res)=>{
    const verified = jwt.verify(req.headers.autherization.split(' ')[1],process.env.JWT_KEY);
    if(!verified)return res.send('Denied')
    try {
        await Log.update({userId:verified.id},{$pull:{logs:{_id:req.body.id}}})
        res.send('Success')
    } catch (error) {
    
    }
   
    
    
})


router.get('/getLogs',async(req,res)=>{
    const verified = jwt.verify(req.headers.autherization.split(' ')[1],process.env.JWT_KEY);
    if(!verified)return res.send('Denied');
    const {logs} = await Log.findOne({userId:verified.id},{_id:0,userId:0,__v:0});
    res.send({logs:logs})
    
})

module.exports = router;
