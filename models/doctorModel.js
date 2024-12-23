const mongoose = require('mongoose')

const doctorSchema = new mongoose.Schema({
    doctorName:{
        type:String,
        required:true
    },
    doctorEmail:{
        type:String,
        required:true
    },
    experience:{
        type:String,
        required:true
    },
    address1:{
        type:String,
        required:true
    },
    address2:{
        type:String,
        required:true
    },
    aboutDoctor:{
        type:String,
        required:true
    },
    speciality:{
        type:String,
        required:true
    },
    degree:{
        type:String,
        required:true
    },
    fees:{
        type:String,
        required:true
    },
    doctorImg:{
        type:String,
        required:true
    },
    doctorId:{
        type:String
    }
})


const doctors = mongoose.model("doctors",doctorSchema)
module.exports=doctors