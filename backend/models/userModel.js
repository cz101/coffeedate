
// todo connect with DB get all the user
const users = require('../data/users')
const {v4: uuidv4} = require('uuid')
const fs= require('fs')

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
    return new Promise((resolve , reject)=>{

      const newUser = {id :uuidv4(), ... user}
      users.push(newUser)
      fs.writeFileSync('./data/users.json',users,'utf8',(error)=>{if(error){console.log(error)}})
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