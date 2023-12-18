
// todo connect with DB get all the user
let users = require('../data/users')
const {v4: uuidv4} = require('uuid')
const {writeDataToFile} = require('../../utils')

function findAll(){
  return new Promise((resolve , reject)=>{
     resolve(users)
  })
}

function findUserById(id){
  return new Promise((resolve , reject)=>{
  // console.log(users)
   const user= users.find((e) => e.id === id)
   console.log("finding the user "+ user)
     resolve(user)
  })
}

  function create(user){
    console.log("In data model creating user:"  )

    return new Promise((resolve , reject)=>{
      const newUser = {id :[uuidv4()], ... user}
      users.push(newUser)
      
      writeDataToFile('./backend/data/users.json', users)
      resolve(newUser)
    })

}
// to create
// to update
// to delete 

module.exports = {
  findAll,
  findUserById,
  create
}