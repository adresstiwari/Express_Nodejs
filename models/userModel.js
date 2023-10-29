const mongoose = require ("mongoose")

const userSchema = new mongoose.Schema({
    username :{
       type: String,
       required :[true, 'Name is required'],
       trim:true,
       maxLength:[20,'name must be less than 20 char']
    },
     password : {
        type:String,
        unique:true
     } ,
     email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true
    }
    
})


module.exports=mongoose.model("User",userSchema)