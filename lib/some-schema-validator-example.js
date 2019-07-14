const mongoose = require('mongoose')

// Schema definition with validation:
const someSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  height: Number
})

module.exports = someSchema
