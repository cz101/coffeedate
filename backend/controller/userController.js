const Users = require('../models/userModel')
const formidable = require ('formidable') // dealing the request data format in

const fs= require('fs')

async function getAllUsers(req,res){
  try {
    const users = await Users.findAll()
    res.writeHead(200, {'Content-Type':'text/html'})
    fs.readFile('user/adminuser/admin.html', (error, html)=>{
      if(error){
        res.writeHead(404)
        res.write('Error : File Not Found'+error)
      }
      else{
        console.log("writing")
        res.write(html)
      }
      res.end()
    })
}
  catch(error){
    console.log("There is an error on get users"+(error))
  }
}
// get a user
// Route /user/profile/id
async function getUserById(req,res, id){
  try {
    const user = await Users.findUserById(id)
    console.log("user id is: " + id)
    console.log("user is: "+ user)
    if (!user) {
        res.writeHead(404)
        res.end(JSON.stringify({Message : "No such user registered"}))

    }
    else {
    res.writeHead(200, {'Content-Type':'text/html'})
    fs.readFile('/user/userprofile.html', (error, html)=>{
      if(error){
        res.writeHead(404)
        res.write('Error : File Not Found'+error)
      }
      else{
        res.write(html)
      }
      res.end()
    }
  )
}}
  catch(error){
    console.log("There is an error on get users"+(error))
  }

}
// create a user 

async function createrUser(req, res, form){
  try {
  
     form.parse(req,   async function (error, fields, files){
         if(error){
            console.log(error.messge)
            return ;
         }
         console.log(JSON.stringify(fields))

        let reguser= checkinput(fields)
        const newUser =  await Users.create(fields)
        res.writeHead(200,{'Content-Type': 'application/json'})
        res.write("done with regisgter\n");
        return res.end(JSON.stringify(newUser))
         })

  

  }
  catch(error){
    console.log("There is an error add the user"+(error))
  }

}

function checkinput (payload){
  let user = new Map()
  for (const [key, value] of Object.entries(payload)) {
    console.log(`${key}: ${value}`);
   // user.set(`${key}`, `${value}`) 
     }
  return user ;
 }
module.exports = {
  getAllUsers,
  getUserById,
  createrUser
}