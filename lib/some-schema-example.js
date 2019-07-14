const mongoose = require('mongoose')

// if we were to use `capitalize` it would need to be defined elsewhere
const capitalize = function (val) {
  if (typeof val !== 'string') val = ''
  return val.charAt(0).toUpperCase() + val.substring(1)
}

const someSchema = new mongoose.Schema({
  name: {
    firstName: {
      type: String,
      set: capitalize
    },
    lastName: {
      type: String,
      set: capitalize
    }
  },
  location: {
    type: String,
    default: 'Boston'
  }
})

module.exports = someSchema
