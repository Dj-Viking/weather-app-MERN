require('dotenv').config();
const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require('bcrypt');
const City = require('./City.js');

const userSchema = new Schema
(
  {
    username: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      trim: true
    },
    password: {
      type: String,
      required: true,
      minlength: 1
    },
    favoriteCities: [
      City.schema
    ],
    personalApiKey: {//hash this too, ensure the keys are hashed and only accessible by the logged in user
      type: String,
      trim: true
    }
  }
);

/**
 * set up pre-save middleware to create password
 * 
 * context of this set in the scope of this async anonymous function
 * 
 * in this case the function can be treated like an object using 'this'
 * 
 * you add properties to the returned shape of 'this'
 * @params {String} action to preform on schema
 * @params {Function} function to execute the saving of the password returned by the logged in user's query 
 * 
 * this function is called after it is defined to save the password to the 'this of type User' context generated in the context of this function
 */
// eslint-disable-next-line
let user_schema_presave_middleware_info;
userSchema.pre('save', 
  async function(next) {
    //checking if isNew property is truthy
    if (
      this.isNew
      ||
      this.isModified('password')
    ){//if it is new then hash the new password
      this.password = await bcrypt.hash
      (
        this.password,
        Number(process.env.SALT)
      );
    }
    next();
  }
);

userSchema.pre('save',
  async function(next) {
    //checking if isNew property is truthy
    if (
      this.isNew
      ||
      this.isModified('personalApiKey')
    ){
      this.personalApiKey = await bcrypt.hash
      (
        this.personalApiKey,
        Number(process.env.SALT)
      );
    }
    next();
  }
)

//compare the incoming password with the hashed password
userSchema.methods.isCorrectPassword = 
async function(password) {
  return await bcrypt.compare(password, this.password);
}

const User = mongoose.model('User', userSchema);

module.exports = User;