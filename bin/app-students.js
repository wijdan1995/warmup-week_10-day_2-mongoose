'use strict'

const mongoose = require('mongoose')
mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost/mongoose-crud', {
  useMongoClient: true
})
const db = mongoose.connection

//Here, Import the `models/student.js` to variable and called 'Student'
const Student = require('../models/student.js');

const done = function () { // eslint-disable-line no-unused-vars
  db.close()
}


const create = function (firstName, lastName, grade, age, city) {
  /* Add Code Here */
  // node bin/app-students.js create firstname last grade age city
  // to get and set the values
  const studentParams = {
    firstName: firstName,
    lastName: lastName,
    grade: grade,
    age: age,
    city: city
  }
  //the method create using the params
  Student.create(studentParams)
    // to print what we saved
    .then((student) => console.log(student.toJSON()))
    // if there is any errors
    .catch(console.error)
    // to close the database -> get out of mongodb
    .then(done)
}

const index = function () {
  /* Add Code Here */
  // find all
  Student.find()
    // for each one console log
    .then(students => {
      students.forEach(student => console.log(student.toJSON()))
    })
    .catch(console.error)
    .then(done)
}

const show = function (id) {
  /* Add Code Here */
  // find only one by id 
  Student.findById(id)
    // console log the resulte
    .then(student => console.log(student.toJSON()))
    .catch(console.error)
    .then(done)
}

const destroy = function (id) {
  /* Add Code Here */
  // find by id
  Student.findById(id)
    // delete what it find
    .then(student => student.remove())
    .catch(console.error)
    .then(done)
}

const update = function (id, field, value) {
  /* Add Code Here */
  // to run node bin/app-students.js update (id) (field) (value)
  //node bin/app-students.js update 5d2c2fb241686f4a302e142f grade 99

  // find by id
  Student.findById(id)
    // get the document and student[age] student[grade] the field is the name of the key then save 
    .then(student => {
      student[field] = value
      return student.save()
    })
    // to show 
    .then(student => console.log(student.toJSON()))
    .catch(console.error)
    .then(done)

}



db.once('open', function () {
  const command = process.argv[2]

  let field
  let id

  switch (command) {
    case 'create':
      const firstName = process.argv[3]
      const lastName = process.argv[4]
      const grade = process.argv[5]
      const age = process.argv[6]
      const city = process.argv[7]

      create(firstName, lastName, grade, age, city)

      break

    case 'show':
      id = process.argv[3]
      show(id)
      break

    case 'update':
      id = process.argv[3]
      field = process.argv[4]
      const value = process.argv[5]
      update(id, field, value)
      break

    case 'destroy':
      id = process.argv[3]
      destroy(id)
      break

    default:
      index()

      break
  }
})

module.exports = Student
