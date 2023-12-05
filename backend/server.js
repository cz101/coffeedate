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
    form.addListener("submit",  (event) => {
      // stop form submission
      event.preventDefault();
     // console.log("here I am ")
      const data = new FormData(event.target);
      const dataObject = Object.fromEntries(data.entries());
      console.log(dataObject);
  })}
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

// fs.readFile('backend/index.html', function (error,html){
//    if (error) throw error;
//    http.createServer(function(req,res){
//     res.writeHead(200,{'Content-Type':'text/html'});
//     res.write(html);
//     res.end()
//    }).listen(port)
// })