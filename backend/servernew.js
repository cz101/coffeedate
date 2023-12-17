const http = require ('http')
const {getAllUsers, getUserById,createrUser} = require('../backend/controller/userController')
const fs= require('fs')
const url = require('url')

const server = http.createServer((req ,res)=>{

  console.log(req.url)
  // let parsedURL = url.parse(req.url, true);
  // let path = parsedURL.pathname;
  // path = path.replace(/^\/+|\/+$/g, "");
  // console.log(path)

  if (req.url && req.method.toLowerCase() ==='get')
  {
   if (req.url ==="/user/adminuser")
    {
        getAllUsers(req,res)
    }
    else if (req.url.match(/\/user\/employee\/([0-9]+)/)){
      {
         const id = req.url.split('/')[3]
         console.log(id)
         getUserById(req,res,id)
      }
    }
   else if ( req.url ==="/user/userregister"&& req.method.toLowerCase() ==='get'){
    console.log('im in register')
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
 

    }

})

const port = process.env.port || 5001

server.listen(port, ()=> console.log(`serve is running on the port : ${port}`))

//module.exports = server;