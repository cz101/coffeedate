const http = require ('http')
const {getAllUsers, getUserById, createrUser,createNewUser,deleteUser} = require('../backend/controller/userController')
const fs= require('fs')
const formidable = require ('formidable') // dealing the request data format in
const user= require('./data/users')

const server = http.createServer((req ,res)=>{
  // res.writeHead(200,{'Content-Type': 'application/json'})
  // res.end(JSON.stringify(user));

  //to do  dynamic routing 
  console.log("going to:"+ req.url)


  if (req.url && req.method.toLowerCase() ==='get'){
   if (req.url ==="/user/adminuser")
    {
        getAllUsers(req,res)
    }
   else if (req.url.match(/\/user\/employee\/([a-z0-9\-]+)/)){
    {

         const id = req.url.split('/')[3]
         console.log("user id is " + id)
         getUserById(req,res,id)
      }
    }
   else if ( req.url ==="/user/userregister"){

      res.writeHead( 200, {'Content-Type':'text/html'})
      fs.readFile('user/userregister.html', (error, html)=>{
        if(error){
          res.writeHead(404)
          res.write('Error : File Not Found')
        }
        else{
  
          res.write(html)
        }
        res.end()
      })}
   else if (req.url ==="/backend/data/")
      {
           res.writeHead(200,{'Content-Type': 'application/json'})
           res.end(JSON.stringify(user));
      }
   else if (req.url === '/user/css/adminuser.css'||req.url === '/user/css/userprofile.css') {
      res.writeHead(200, {'Content-Type': 'text/css'}); 
      fs.readFile('user/css/adminuser.css', (error, data)=>{
        if(error){
          res.writeHead(404)
          res.write('Error : File Not Found')
        }
        else{          
          res.write(data)
        }        
        res.end();
      })
    }
    else if (req.url === '/backend/retriveuser.js') {
      res.writeHead(200, {'Content-Type': 'text/javascript'}); 
      fs.readFile('backend/retriveuser.js', (error, data)=>{
        if(error){
          res.writeHead(404)
          res.write('Error : File Not Found')
        }
        else{          
          res.write(data)
        }        
        res.end();
      })
    }
  } //end of get 
  else if (req.url ==="/user/userregister"&& req.method.toLowerCase() ==='post'){
    console.log("creating--->")
     //let form =  new formidable.IncomingForm()
     //createrUser(req,res,form)
     createNewUser(req,res)
   }
  else if (req.method.toLowerCase() ==='delete'){
    if (req.url.match(/\/user\/employee\/([a-z0-9\-]+)/))      
    {  const id =   req.url.split('/')[3]
       deleteUser(req,res,id)}
    
  }
})

const port = process.env.port || 5001

server.listen(port, ()=> console.log(`server is running on the port : ${port}`))


function dynamicRoutePath (incomingPath) {

  const dpath = '';

  const parsedURL = url.parse(incomingPath, true);
  dpath = parsedURL.pathname;
  dpath = path.replace(/^\/+|\/+$/g, "");
  console.log(dpath)

  return dpath 
}

//module.exports = server;