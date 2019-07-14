Helpful drawing:
https://git.generalassemb.ly/storage/user/5688/files/62955a88-263e-11e7-9b26-a61f7961a990

### Solution without relationships

The solution branch to this repo shows the code after setting up a relationship
between people and places. Here is how `app-people.js` would look without that
extra relationship code:

```js
'use strict'

const mongoose = require('mongoose')
mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost/mongoose-crud', {
  useMongoClient: true
})
const db = mongoose.connection

const Person = require('../models/person.js')
const Place = require('../models/place.js')

const done = function () { // eslint-disable-line no-unused-vars
  db.close()
}

const index = function () {
  Person.find()
    .then(function (people) {
      // loop through all the people objects that were returned by the db query
      people.forEach(function (person) {
        // log each person as JSON
        console.log(person.toJSON())
      })
    })
    .catch(console.error)
    .then(done)
}

const show = function (id) {
  Person.findById(id)
    .then(person => person.toObject())
    .then(console.log)
    .catch(console.error)
    .then(done)
}

const create = function (firstName, lastName, dob, height, weight) {
  // reconfigure the parameters passed into the function into an object with
  // the correct attributes
  const personParams = {
    name: {
      firstName,
      lastName
    },
    dob,
    height,
    weight
  }

  // pass that object to Person.create (a mongoose method) to add it to the db
  Person.create(personParams)
    .then(function (person) {
      console.log(person)
    })
    .catch(function (error) {
      console.error(error)
    })
    .then(done)
}

const update = function (id, field, value) {
  // find a Person object in the db whose id matches the parameter passed in
  Person.findById(id)
    .then(function (person) {
      // modify that Person object with the new (or updated) key/value pair
      person[field] = value
      // save the new Person in the db
      return person.save()
    })
    .then(function (person) {
      console.log(person.toJSON())
    })
    .catch(console.error)
    .then(done)
}

const destroy = function (id) {
  // find a Person object in the db whose id matches the parameter passed in
  Person.findById(id)
    .then(function (person) {
      // remove the Person from the db
      return person.remove()
    })
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
      const dob = process.argv[5]
      const height = process.argv[6]
      const weight = process.argv[7]

      create(firstName, lastName, dob, height, weight)

      break

    case 'show':
      id = process.argv[3]
      show(id)
      break

    case 'search':
      field = process.argv[3]
      const criterion = process.argv[4]
      if (!criterion) {
        console.log('usage: search <field> <criterion>')
        done()
      } else {
        index(field, criterion)
      }
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
```
