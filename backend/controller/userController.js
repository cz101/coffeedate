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
    fs.readFile('user/userprofile.html', (error, html)=>{
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

async function createrUser(req,res){
  try {
     const userInfo = {
      firstname: "t",
      lasttname: "t",
      email: "test@t.com",
     }
 
     let form =  new formidable.IncomingForm()
     console.log (form)
     form.parse(req, await function (error, fields, files){
         if(error){
            console.log(error.messge)
            return ;
         }
        // res.writeHead(200, {'Content-Type':'text/plain'})
         res.writeHead(200, {'Content-Type':'application/json'})
         //console.log(util.inspect({fields:fields[lastName],files:files}))
          let payload =  JSON.parse(JSON.stringify(fields))
       // console.log(regUser(JSON.parse(JSON.stringify(fields))))
       //  connectdb();
       const newUser =  Users.create(payload)
       //addUser(JSON.parse(JSON.stringify(fields)))
        //res.end(util.inspect({fields:fields,files:files}))
        res.write("done with regisgter");
        res.writeHead(200, {'Content-Type':'application/json'})
        return res.end(JSON.stringify(newUser))
      })


  
  
    res.writeHead(200, {'Content-Type':'application/json'})
    return res.end(JSON.stringify(newUser))

  }
  catch(error){
    console.log("There is an error on get users"+(error))
  }

}

module.exports = {
  getAllUsers,
  getUserById,
  createrUser
}