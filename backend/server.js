const http = require ('http')
const fs= require('fs')
const port = 3000
const server = http.createServer( function(req, res) {
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