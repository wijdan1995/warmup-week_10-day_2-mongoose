const mongoose = require('mongoose')

// Custom validators:
const someSchema = new mongoose.Schema({
  someEvenValue: {
    type: Number,
    validate: {
      validator: function (num) {
        return num % 2 === 0
      },
      message: 'Must be even.'
    }
  }
})

module.exports = someSchema
