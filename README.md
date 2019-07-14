[![General Assembly Logo](https://camo.githubusercontent.com/1a91b05b8f4d44b5bbfb83abac2b0996d8e26c92/687474703a2f2f692e696d6775722e636f6d2f6b6538555354712e706e67)](https://generalassemb.ly/education/web-development-immersive)

# Warm-up for Mongoose

## Objectives

By the end of this talk, developers should be able to:

- Access and manipulate a MongoDB database from a Javascript program by using Mongoose.
- Combine multiple Mongoose operations by using Javascript Promises.
- Validate data for storage in MongoDB by setting up Mongoose validations.

## Preparation

1. Fork and clone
   this repository
1. Create a new branch, `training`, for your work.
1. Checkout to the `training` branch.
1. Install dependencies with `npm install`.

## The Exercise

## Mongoose Schemas, Models, and Documents
there a file Mongoose model called 'student.js' in `/modle/student.js` , and load it from the `app-students.js`
file located in the `bin` directory; that file will provide a command-line UI
for performing CRUD on you new Student resource.

The 'action' methods in `app-students.js` have no content;
you'll need to fill them up with code for doing CRUD on your new model.




The Schema of Students.
Students have the following features:

- firstName - (String, required) 
- lastName  - (String, required)
- grade     - (Number, required)
- age       - (Number, Greater than or equal 18)
- city      - (String)



You should ensure that only reasonable values of firstName, lastName and grade allowed to be added to the database. The age should be numbers that greater than or equal to 18.

## [License](LICENSE)

1. All content is licensed under a CC­BY­NC­SA 4.0 license.
1. All software code is licensed under GNU GPLv3. For commercial use or
    alternative licensing, please contact legal@ga.co.
