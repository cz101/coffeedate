let Users = require('../models/userModel')
const path = require('path');
const formidable = require('formidable') // lib easily parsing the form data 
const fs = require('fs')
const { getPostData } = require("../utils")

// handling care of file types
const mimeTypes = {
  ".html": "text/html",
  ".js ": "text/javascript",
  //".js ": "module",
  ".css": "text/css",
  ".json": "application/json",
}

const getContentType = (url) => {
  let contentType = 'text/html'; // default type
  const extensionName = path.extname(url); // Returns the file extension of a path
  for (let key in mimeTypes) {
    if (extensionName === key) {
      contentType = mimeTypes[key];
    }
  }
  return contentType;
};

const adminUser = (req, res) => {
  try {
    const fileType = getContentType(req.url)
    res.writeHead(200, { 'Content-Type': `${fileType}` })
    fs.readFile('user/adminuser/admin.html', (error, html) => {
      if (error) {
        res.writeHead(404)
        res.write('Error : File Not Found' + error)
      }
      else {
        res.write(html)
      }
      res.end()
    })
  }
  catch (error) {
    console.log("UI : There is an error on get all users" + (error))
  }
}
const employeeProfile = async (req, res) => {
  try {
    const id = req.url.split('/')[3]
    const user = await Users.findUserById(id)
    if (user) {
      res.writeHead(200, { 'Content-Type': 'text/html' })
      fs.readFile('user/employee/userprofile.html', (error, html) => {
        if (error) {
          res.writeHead(404)
          res.write('Error : File Not Found' + error)
        }
        else {
          res.write(html)
        }
        res.end()
      }
      )
    }
    else {
      res.writeHead(404)
      res.end("--> No such user registered") // why not this line  
    }
  }
  catch (error) {
    res.writeHead(404)
    res.end("No such a userregistered")
  }

}


/* API calls */
const getAllUsers = async (req, res) => {
  try {
    const fileType = getContentType(req.url)
    let allRegUser = await Users.findAll()
    res.writeHead(200, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify(allRegUser))
  }
  catch (error) {
    console.log("API : There is an error on get all users:" + (error))
  }
}
// Route /user/profile/id
const getUserById = async (req, res) => {
  try {
    const id = req.url.split('/')[3]
    const user = await Users.findUserById(id)
    res.writeHead(200, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify(user))
  }
  catch (error) {
    res.writeHead(404)
    res.end("API: No such an registereduser")
  }

}

const createUser = async (req, res, form) => {
  try {
    form.parse(req, async function (error, fields, files) {
      if (error) {
        console.log(error.messge)
        // return ;
      }
      // console.log(JSON.stringify(fields))
      const registerUser = formateInput(fields)
      await Users.create(registerUser)
      res.writeHead(200, { 'Content-Type': 'application/json' })
      res.write("done with regisgter\n");
      res.end()
    })
  }
  catch (error) {
    console.log("There is an error add the user" + (error))
  }

}

const createNewUser = async (req, res) => {
  try {
    console.log("creating")
    let body = await getPostData(req)
    const { firstName, lastName } = JSON.parse(body)
    const user = {
      firstName,
      lastName
    }
    const newUser = await Users.create(user)
    console.log(newUser)
    res.writeHead(200, { 'Content-Type': 'application/json' })
    return res.end(JSON.stringify(newUser))
  }
  catch (error) {
    console.log("There is an error add the user" + (error))
  }

}

const deleteUser = async (req, res) => {
  try {
    const id = req.url.split("/")[3];
    const user = await Users.findUserById(id)
    if (!user) {
      res.writeHead(404)
      res.end(JSON.stringify({ Message: "No such user registered" }))
    }
    else {
      await Users.remove(id)
    }
  }
  catch (error) {
    res.end("There is an error on delete user")
  }

}


const editUser = async (req, res) => {
  try {
    console.log("here is the req" + JSON.stringify(req))
    const id = req.url.split("/")[3];
    const user = await Users.findUserById(id)
    if (!user) {
      res.writeHead(404)
      res.end(JSON.stringify({ Message: "No such user registered" }))
    }
    else {
      console.log("here is the payload")
      // await Users.update(id, req.payload)
    }
  }
  catch (error) {
    res.end("There is an error on edit the user")
  }

}

const registNewuser = (req, res) => {
  try {
    res.writeHead(200, { 'Content-Type': 'text/html' })
    fs.readFile('user/userregister.html', (error, html) => {
      if (error) {
        res.writeHead(404)
        res.write('Error : File Not Found')
      }
      else {

        res.write(html)
      }
      res.end()
    })
  }
  catch (error) {
    console.log("There is an error on register users" + (error))
  }

}

const getCssFile = (req, res) => {

  const fileType = getContentType(req.url)
  // const extensionName = path.extname(req.url); // Returns the file extension of a path
  // console.log("ex ====>" + extensionName + ':'+ `${fileType}`)
  // let checkingFiles = [
  //   'user/css/user.css',
  //   'user/css/userregister.css',
  //   'backend/retriveuser.js'
  // ]
  // let processedfile = checkingFiles.map((e)=>{
  //   if (e.includes(extensionName))
  //   return e
  // }).toString()
  // console.log('checking ==>'+processedfile)

  res.writeHead(200, { 'Content-Type': `${fileType}` })

  fs.readFile('user/css/user.css', (error, data) => {
    if (error) {
      res.writeHead(404)
      res.write('Error : File Not Found')
    }
    else {
      res.write(data)
    }
    res.end();
  })
}

const getJSFile = (req, res) => {

  res.writeHead(200, { 'Content-Type': 'javascript' });
  fs.readFile('backend/retriveuser.js', (error, data) => {
    if (error) {
      res.writeHead(404)
      res.write('Error : File Not Found')
    }
    else {
      res.write(data)
    }
    res.end();
  })
}

// to do try to use generic function to create pages
const createPage = (reg, res) => {
  try {
    const fileType = getContentType(req.url)
    console.log("request file content type is :" + fileType)
    res.writeHead(200, { 'Content-Type': `${fileType}` })
    fs.readFile(reg.url, (error, html) => {
      if (error) {
        res.writeHead(404)
        res.write('Error : File Not Found' + error)
      }
      else {
        res.write(html)
      }
      return res.end()
    })
  }
  catch (error) {
    console.log("There is an error on get users" + (error))
  }
}

const formateInput = (payload) => {
  let users = {}
  for (const [key, value] of Object.entries(payload)) {
    console.log(`${key}: ${value}`)
    Object.assign(users, { [key]: `${value}` })
  }
  return users
}

// to do assigning the date
const randomAssign = () => {
  let assignuser = ''
  console.log("random assgin")
  return assignuser
}

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  createNewUser,
  deleteUser,
  registNewuser,
  getCssFile,
  getJSFile,
  adminUser,
  employeeProfile,
  editUser
}