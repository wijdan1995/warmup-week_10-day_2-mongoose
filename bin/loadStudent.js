'use strict'

const mongoose = require('mongoose')
mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost/mongoose-crud', {
  useMongoClient: true
})
const db = mongoose.connection

const student = require('../models/student')

const fs = require('fs')

const done = function () {
  db.close()
}

const loadStudent = () =>
  new Promise((resolve, reject) => {
    const parse = require('csv').parse

    const input = fs.readFileSync('./data/student.csv', 'utf8')

    parse(input, { columns: true }, (err, output) => {
      if (err) reject(err)

      resolve(output.map(student => ({
        name: { firstName: student.first_name, lastName: student.last_name },
        grade: student.grade,
        age: student.age,
        city: student.city
      })))
    })
  })

db.once('open', function () {
  // if the student model file is empty or malformed, tell the user so
  if (!student.insertMany) {
    console.log('You must create and export a student model before running this script.')
    return done()
  }

  loadStudent()
    // Below is the way to insert that bypasses mongoose validations
    // .then((Student) => {
    //   student.collection.insert(Student)
    // })
    // This inserts and runs the documents through mongoose validations
    .then(student.insertMany)
    .then(docs => console.log(docs.length + ' documents inserted'))
    .then(done)
    .catch(console.log)
})
