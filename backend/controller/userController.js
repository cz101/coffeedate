let Users = require('../models/userModel')
const path = require('path');
const formidable = require ('formidable') // dealing the request data format in
const fs= require('fs')
const {getPostData} = require("../utils")

 // taking care of file types
 const mimeTypes = {
   "html": "text/html",
    "css": "text/css",
    "js ": "text/javascript",
    "json": "application/json",
 }
 const getContentType = (url) => {

  let contentType = 'text/html';
  const extname = path.extname(url);
  for (let key in mimeTypes) {
    if (mimeTypes.hasOwnProperty(key)) {
      if (extname === key) {
        contentType = mimeTypes[key];
      }
    }
  }
  return contentType;
};

async function getAllUsers(req,res){
  try {
    const fileType = getContentType(req.url)
    console.log("request file content type is :" +fileType)
    res.writeHead(200, {'Content-Type':`${fileType}`})
    fs.readFile('user/adminuser/admin.html', (error, html)=>{
      if(error){
        res.writeHead(404)
        res.write('Error : File Not Found'+error)
      }
      else{
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
async function getUserById(req, res, id){
  try {
    const user = await Users.findUserById(id)
    // console.log("user id is: " + id)
    // console.log("user is: "+ JSON.stringify(user))
    if (!user) {
        res.writeHead(404)
        res.end(JSON.stringify({Message : "No such user registered"}))

    }
    else {
    res.writeHead(200, {'Content-Type':'text/html'})
    fs.readFile('user/employee/userprofile.html', (error, html)=>{
      if(error){
        res.writeHead(404)
        res.write('Error : File Not Found'+ error)
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

async function createNewUser(req, res){
  try {
    console.log("creating")
    let body =  await getPostData(req)
    const { firstName, lastName} = JSON.parse(body)
    const user = { 
       firstName,
       lastName
    }
   const newUser =  await Users.create(user)
   console.log (newUser)
    res.writeHead(200,{'Content-Type': 'application/json'})
    return res.end(JSON.stringify(newUser))
  }
  catch(error){
    console.log("There is an error add the user"+(error))
  }

}

async function deleteUser(req, res, id){
  try {
    console.log("deleting")
    const user = await Users.findUserById(id)
    console.log(user)
    if (!user) {
        res.writeHead(404)
        res.end(JSON.stringify({Message : "No such user registered"}))
    }
    else {
      await Users.remove(id)
      res.writeHead(200,{'Content-Type': 'application/json'})
      res.end(JSON.stringify({message:`Product ${id} removed`}))
     
      
      res.end()
    }

}
  catch(error){
    console.log("There is an error on get users"+(error))
  }

}

function createPage (reg,res){
  try {
    const fileType = getContentType(req.url)
    console.log("request file content type is :" +fileType)
    res.writeHead(200, {'Content-Type':`${fileType}`})
    fs.readFile(reg.url, (error, html)=>{
      if(error){
        res.writeHead(404)
        res.write('Error : File Not Found'+error)
      }
      else{
        res.write(html)
      }
      return res.end()
    })
}
  catch(error){
    console.log("There is an error on get users"+(error))
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
  createrUser,
  createNewUser,
  deleteUser
}