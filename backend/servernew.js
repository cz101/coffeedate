const http = require ('http')
const {getAllUsers, getUserById,createrUser} = require('../backend/controller/userController')
const fs= require('fs')
//const url = require('url')
const formidable = require ('formidable') // dealing the request data format in

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
  else if (req.url ==="/user/userregister"&& req.method.toLowerCase() ==='post'){


     let form =  new formidable.IncomingForm()
    // console.log (form)
    // form.parse(req,  function (error, fields, files){
    //     if(error){
    //        console.log(error.messge)
    //        return ;
    //     }
    //     res.writeHead(200, {'Content-Type':'text/plain'})
    //     let payload =  JSON.parse(JSON.stringify(fields))
    //  //   const newUser =  Users.create(payload)
    //     res.write("done with regisgter");
    //     return res.end()
    //   })

     createrUser(req,res ,form)
   }
})

const port = process.env.port || 5001

server.listen(port, ()=> console.log(`server is running on the port : ${port}`))

//module.exports = server;