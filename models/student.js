'use strict'

//- import the 'mongoose' 
const mongooes = require('mongoose');
// The new schema, here
//- Create new Schema called 'studentSchema'
const studentSchema = new mongooes.Schema({
    // * firstName - (String, required)
    firstName: {
        type: String,
        required: true
    },
    // * lastName - (String, required)
    lastName: {
        type: String,
        required: true
    },
    // * grade - (Number, required)
    grade: {
        type: Number,
        required: true
    },
    // * age - (Number, Greater than or equal 18)
    age: {
        type: Number,
        min: 18
    },
    // * city - (String)
    city: {
        type: String
    }
},
    {
        timestamps: true
    })

// The model of the schema 
const Student = mongooes.model("Student", studentSchema)

// Export the model 
module.exports = Student

