// Require schema and model from mongoose
const { Schema, model, Types } = require('mongoose');
// const dateFormat = require("../utils/dateFormat");

// Create a new instance of the Mongoose schema to define shape of each document
const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: "Thought is required", 
            // between 1 - 280 characters
            minlength: 1, 
            maxlenght: 280, 
        }, 
        createdAt: {
            typoe: Date,
            // current timestamp
            default: Date.now, 
            // getter method to format the timestamp on query
            get: (timestamp) => dateFormat(timestamp),
        },
        username: {
            type: String, 
            required: true, 
        }, 
        // Array of nested documents created with the reactionSchema
        reactions: [ReactionSchema],
    },

    // An object with one key-value pair. The key is getters and the value is true. 
    //This suggests that when this object is serialized to JSON using JSON.stringify()
    // any getters defined on the object will be included in the resulting JSON string
    {
        toJSON: {
          virtuals: true,
        },
        id: false,
      },  
    );

    // how to run it 
    //npm i, npm run seed, npm start
    // go to insonmia 
