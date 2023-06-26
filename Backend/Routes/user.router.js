
const express = require('express');
const jwt = require('jsonwebtoken');
const { userModel } = require('../model/user.model');
const bcrypt = require("bcrypt")
const main=require("../nodemail")
const userRouter = express.Router()

userRouter.get("/homepage", async (req, res) => {

    res.status(200).send({ "msg": "HOME Page" })
})

userRouter.post("/register", async (req, res) => {
    const { name, email, password,isVerified } = req.body
    try {
        const user = await userModel.findOne({email})

        if(!user){
            bcrypt.hash(password, 5, async (err, hash) => {
                const user = new userModel({ name,email,  password: hash,isVerified })
                await user.save()
                main(user.email)
                res.status(200).send({ "msg": "registration done succesfully" })
            })
        }else{
            res.status(201).send({ "msg": "User already registered" })
        }

        

    } catch (err) {
        res.status(400).send({ "msg": "registration failed" })
    }

})
userRouter.post("/login", async (req, res) => {
    let { email, password } = req.body
    try {
        const user = await userModel.findOne({email})
        if (user) {
            bcrypt.compare(password, user.password, (err, result) => {
                if (result) {
                    res.status(200).send({ "msg": "login succesfully", "token": jwt.sign({ "userID":user._id }, "jammi", { expiresIn: '3h' }) })
                } else {
                    res.status(400).send({ "msg": "login failed" })
                }
            })

        }

    } catch (err) {
        res.status(400).send({ "msg": err.massage })
    }

})



userRouter.post('/logout', async (req, res) => {
    // const { name, email,mobile_No, password,  age } = req.body
    const token = req.cookies.token;
    console.log("********************************************************");
    console.log(token);
    console.log("********************************************************");
    if (!token) {
        return res.status(400).send({ msg: 'No token provided' });
    }
    try {
        const isTokenBlacklisted = await logoutModel.findOne(
             { token }
      );
        if (!isTokenBlacklisted) {
            const Logoutuser = new userModel({ token})
            await Logoutuser.save()
            res.status(200).send({ "msg": "Logout succesfully" })
        } else {
            return res.status(401).send({ msg: 'Invalid token' });
        }
    } catch (error) {
        return res.status(500).send({ msg: error.message });
    }
});



module.exports = { userRouter }

