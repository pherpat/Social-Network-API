// Define Mongoose
const { Schema, model } = require('mongoose');

// Schema to create User model
const userSchema = new Schema(
    {
    username: {
        type: String, 
        unique: true,
        required: "Username is Required",
        trimmed: true
    }, 

    email: {
        type: String, 
        required: "Email is required", 
        unique: true, 
        match: [/.+@.+\..+/] //regular expression pattern used for email validation
    },

    thoughts: [
        {
        // used to define fields in Mongoose schemas that will store MongoDB ObjectIds
        type: Schema.Types.ObjectId,
        ref: "Thought",
        },
    ],

    friends: [{
        type: Schema.Types.ObjectId,
        ref: "User",
        },
    ],
},
    //This is an options object that can be passed to a Mongoose schema to modify its behavior when converting documents to JSON format.
    {
        toJSON: {
          virtuals: true,
        },
        id: false,
      },  
);

// Mongoose schema method -  defines a virtual property for a User document
// / Create a virtual property `friendCount` that gets the amount of friends 
userSchema.virtual("friendCount")
// Getter
.get(function () {
    return this.friends.length;
  });

// Using mongoose.model() to compile a model based on the schema 'userSchema'
// Initialize the User model 
const User = model('User', userSchema);

// Export module Thought 
module.exports = User;