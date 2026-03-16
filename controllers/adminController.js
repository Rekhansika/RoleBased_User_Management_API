const User = require("../models/User")
const AuditLog = require("../models/AuditLog")

exports.getAllUsers = async (req,res) => {

    const users = await User.find()

    res.json(users)

}


exports.blockUser = async (req,res) => {

    const user = await User.findByIdAndUpdate(
        req.params.id,
        {isBlocked:true},
        {new:true}
    )

    await AuditLog.create({
        adminId:req.user.id,
        action:"BLOCK_USER",
        targetUser:req.params.id
    })

    res.json(user)

}


exports.promoteUser = async (req,res) => {

    const user = await User.findByIdAndUpdate(
        req.params.id,
        {role:"admin"},
        {new:true}
    )

    await AuditLog.create({
        adminId:req.user.id,
        action:"PROMOTE_USER",
        targetUser:req.params.id
    })

    res.json(user)

}