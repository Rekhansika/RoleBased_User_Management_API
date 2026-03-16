const User = require("../models/User")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

exports.register = async (req,res) => {

    try{

        const {name,email,password} = req.body

        const hashedPassword = await bcrypt.hash(password,10)

        const user = new User({
            name,
            email,
            password:hashedPassword
        })

        await user.save()

        res.json({message:"User registered successfully"})

    }catch(err){
        res.status(500).json(err)
    }

}


exports.login = async (req,res) => {

    try{

        const {email,password} = req.body

        const user = await User.findOne({email})

        if(!user){
            return res.status(404).json({message:"User not found"})
        }

        if(user.isBlocked){
            return res.status(403).json({message:"User blocked"})
        }

        const isMatch = await bcrypt.compare(password,user.password)

        if(!isMatch){
            return res.status(400).json({message:"Invalid credentials"})
        }

        const token = jwt.sign(
            {id:user._id,role:user.role},
            process.env.JWT_SECRET,
            {expiresIn:"1d"}
        )

        res.json({token})

    }catch(err){
        res.status(500).json(err)
    }

}