const mongoose = require("mongoose")

const auditSchema = new mongoose.Schema({

    adminId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },

    action:{
        type:String
    },

    targetUser:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }

},{timestamps:true})

module.exports = mongoose.model("AuditLog",auditSchema)