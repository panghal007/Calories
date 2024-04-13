const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs');
const { required } = require('joi');

const userSchema = new mongoose.Schema({

    username:{
        type: String,
        required: [true,'please enter a valid username']
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
    },
    weightLossRate:{
        type:Number,
        enum:[0.9,0.7,0.5]
    }

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

userSchema.methods.calculateBMR = function(){
    let bmr;
    if(this.gender === 'male'){
        bmr = (10*this.weight) + (6.25*this.height) - (5*this.age) + 5
    }
    else if(this.gender === 'female'){
        bmr = (10*this.weight) + (6.25*this.height) - (5*this.age) -161
    }

    return bmr
}

userSchema.methods.

userSchema.methods.calculateTDEE = function(){
    const bmr = this.calculateBMR();
    let tdee = bmr;
    switch (this.lifestyle) {
        case 'sedentary':
            tdee *= 1.2;
            break;
        case 'lightlyactive':
            tdee *= 1.375;
            break;
        case 'moderatelyactive':
            tdee *= 1.55;
            break;
        case 'veryactive':
            tdee *= 1.725;
            break;
        case 'extremelyactive':
            tdee *= 1.9;
            break;
        default:
            break;
    }
    return tdee;
}

userSchema.methods.dailyProtein = function(){
    let proteinMultiplier

    if(this.lifestyle === 'sedentary'){
        proteinMultiplier = 1
    }
    else if(this.lifestyle === 'lightlyactive'){
        proteinMultiplier = 1.2
    }
    else if(this.lifestyle === 'moderatelyactive'){
        proteinMultiplier = 1.4
    }
    else if(this.lifestyle === 'veryactive'){
        proteinMultiplier = 1.8
    }
    else if(this.lifestyle === 'extremelyactive'){
        proteinMultiplier = 2.2
    }

    return this.weight*proteinMultiplier
}

module.exports = mongoose.model('User',userSchema)
