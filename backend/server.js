const http = require ('http')
const fs= require('fs')
const url = require('url')
const util= require('util')
const StringDecoder = require('string_decoder').StringDecoder
const formidable = require ('formidable')

const port = 3000
const server = http.createServer( function(req, res) {



  //console.log(http.METHODS)
  let path = url.parse(req.url, true)

  if(req.method.toLowerCase()==='post'){

    const form =  new formidable.IncomingForm("registerform")
     form.parse( req , function( err, fields, files){

        if(err){
           console.log(err.messge)
           return ;
        }
        res.writeHead(200, {'Content-Type':'text/plain'})
        console.log(util.inspect({fields:fields,files:files}))
        res.end()
        
     })
  }
  else if (req.method.toLowerCase() ==='get'){
    res.writeHead( 200, {'Content-Type':'text/html'})
    fs.readFile('frontend/userregister.html', function(error , html){
      if(error){
        res.writeHead(404)
        res.write('Error : File Not Found')
      }
      else{
        res.write(html)
      }
      res.end()
    })

  }
  else {
    console.log("handle it later //") //todo
  }

  //  res.writeHead( 200, {'Content-Type':'text/html'})
  // fs.readFile('frontend/userregister.html', function(error , html){
  //   if(error){
  //     res.writeHead(404)
  //     res.write('Error : File Not Found')
  //   }
  //   else{
  //     res.write(html)
  //   }
  //   res.end()
  // })
})

server.listen(port, function(error) {
   if (error) {
    console.log('something is wrong ', error)
   } else {
    console.log('server is listening on port: ' + port )
   }
})

