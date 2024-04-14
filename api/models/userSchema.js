const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs');
const { required } = require('joi');

const userSchema = new mongoose.Schema({

    username:{
        type: String,
        required: [true,'please enter a valid username'],
        unique:true
    },
    email:{
        type: String,
        // required: [true,'Please enter a valid email'],
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            'Please provide a valid email',
          ],
        unique: true
    },
    password:{
        type: String,
        required: [true,'Please enter a password']
    },
    age:{
        type: Number,
        required: [true,'Please enter your age']
    },
    height:{
        type: Number,
        required: [true,'Please enter your height in cm']
    },
    weight:{
        type: Number,
        required: [true,'Please enter your current Weight in Kgs']
    },
    targetWeight:{
        type: Number,
        required: [true,'Please enter your Target Weight']
    },
    gender:{
        type:String,
        enum: ['male','female']
    },
    lifestyle:{
        type:String,
        enum: ['sedentary','lightlyactive','moderatelyactive','veryactive','extremelyactive']
    }
    // weightLossRate:{
    //     type:Number,
    //     enum:[0.9,0.7,0.5]
    // }

},
{timestamps: true}
);

userSchema.pre('save' , async function(){
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password,salt)
})

userSchema.methods.createJWT = function (){
    return jwt.sign({userId:this._id,name:this.name},process.env.JWT_SECRET,
      {expiresIn: process.env.JWT_LIFETIME})
}

userSchema.methods.comparePassword = async function(candidatePassword){
    const isMatch = await bcrypt.compare(candidatePassword,this.password)
    return isMatch
}



module.exports = mongoose.model('User',userSchema)