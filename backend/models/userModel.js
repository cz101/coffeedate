// todo connect with DB get all the user
// this is using markup of database

let users = require('../data/users.json')
const {v4: uuidv4} = require('uuid') // genereate unique id 
const {writeDataToFile} = require('../utils')

function findAll(){
  return new Promise((resolve , reject)=>{
     resolve(users)
  })
}

function findUserById(id){
  console.log("in findUserById "+ id)
  return new Promise((resolve , reject)=>{
   const user= users.find((e) => e.id === id)
    console.log("found the user "+ user.id)
   resolve(user)
  })
}

function create(user){
    console.log("In data model creating user:"  )
    return new Promise((resolve , reject)=>{
      const newUser = {id :uuidv4(), ... user}
      users.push(newUser)
      writeDataToFile('./backend/data/users.json', users)
      resolve(newUser)
    })

}

function remove(id){
  return new Promise((resolve , reject)=>{
        users = users.filter((user)=>user.id!==id)
       writeDataToFile('./backend/data/users.json', users)
       resolve()
    })
}
// to do update

module.exports = {
  findAll,
  findUserById,
  create,
  remove
}