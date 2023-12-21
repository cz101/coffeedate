
// todo connect with DB get all the user
let users = require('../data/users')
const {v4: uuidv4} = require('uuid')
const {writeDataToFile} = require('../utils')

function findAll(){
  return new Promise((resolve , reject)=>{
     resolve(users)
  })
}

function findUserById(id){
  return new Promise((resolve , reject)=>{
   console.log("in finding"+users)
   const user= users.find((e) => e.id === id)
  console.log("finding the user "+ user.id)
  
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

    //  const userIndex = users.find((e) => e.id === id)
    //  users(userIndex,userIndex,1)
        users = users.filter((user)=>user.id!==id)
       writeDataToFile('./backend/data/users.json', users)
       resolve()
    })
}
// to create
// to update
// to delete 

module.exports = {
  findAll,
  findUserById,
  create,
  remove
}