const http = require ('http')
const {getAllUsers, getUserById, createrUser,createNewUser} = require('../backend/controller/userController')
const fs= require('fs')
const formidable = require ('formidable') // dealing the request data format in
const user= require('./data/users')

const server = http.createServer((req ,res)=>{
  // res.writeHead(200,{'Content-Type': 'application/json'})
  // res.end(JSON.stringify(user));

  //to do routing 

  if (req.url && req.method.toLowerCase() ==='get'){
   if (req.url ==="/user/adminuser")
    {
        getAllUsers(req,res)
    }
    else if (req.url.match(/\/user\/employee\/([0-9]+)/)){
      {
         const id = req.url.split('/')[3]
         getUserById(req,res,id)
      }
    }
    else if ( req.url ==="/user/userregister"&& req.method.toLowerCase() ==='get'){

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
      else if (req.url ==="/backend/data/"&& req.method.toLowerCase() ==='get')
      {
           res.writeHead(200,{'Content-Type': 'application/json'})
            res.end(JSON.stringify(user));
      }
  } //end of get 
  else if (req.url ==="user/userregister"&& req.method.toLowerCase() ==='post'){

     //let form =  new formidable.IncomingForm()
     //createrUser(req,res,form)
     createNewUser(req,res)
   }
//   else if (req.url === '/user/css/adminuser.css'&& req.method.toLowerCase() ==='get') {
//     fs.readFile('/user/css/adminuser.css', 
//     function(error, page) { 
//       if(error){
//         res.writeHead(404)
//         res.write('Error : File Not Found'+ error)
//       }
//       else{
//         res.writeHead(200, {'Content-Type': 'text/css'}); 
//         res.write(page); 
//         //res.end()
//    }
//    res.end()
//   }); 
//  } 

})

const port = process.env.port || 5001

server.listen(port, ()=> console.log(`server is running on the port : ${port}`))

//module.exports = server;