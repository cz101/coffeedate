const http = require ('http')
const fs= require('fs')
const url = require('url')
const util= require('util')
const StringDecoder = require('string_decoder').StringDecoder // dealing the request as data object

const formidable = require ('formidable') // dealing the request data format in
const { stringify } = require('querystring')

const port = 3000
const server = http.createServer( function (req, res)  {

  // console.log(http.METHODS)
  // console.log(http.STATUS_CODES)
  // console.log(req.headers)
  // console.log(req.url)

  //let path = url.parse(req.url, true).pathname
  let parsedURL = url.parse(req.url, true);
  let path = parsedURL.pathname;

  path = path.replace(/^\/+|\/+$/g, "");
  console.log(path)

  let qs = parsedURL.query;
  let headers = req.headers;
  let method = req.method.toLowerCase();

  req.on("data", function() {
    console.log("got some data");
    
    //if no data is passed we don't see this messagee
    //but we still need the handler so the "end" function works.

    // if(req.method.toLowerCase()==='post'){

    //   let form =  new formidable.IncomingForm()
    //  // console.log(stringify(form))
    //   form.parse(req, (error, fields, files)=>{
    //       if(error){
    //          console.log(error.messge)
    //          return ;
    //       }
    //       res.writeHead(200, {'Content-Type':'text/plain'})
    //       //console.log(util.inspect({fields:fields[lastName],files:files}))
  
    //       let info = {
    //           "firstName": fields['firstName']}
    //        console.log(info)   
    //      res.end(util.inspect({fields:fields,files:files}))
    //     //res.end()
    //    })
    // }
    
  });
 /*
  if(req.method.toLowerCase()==='post'){

    let form =  new formidable.IncomingForm()
   // console.log(stringify(form))
    form.parse(req, (error, fields, files)=>{
        if(error){
           console.log(error.messge)
           return ;
        }
        res.writeHead(200, {'Content-Type':'text/plain'})
        //console.log(util.inspect({fields:fields[lastName],files:files}))

        let info = {
            "firstName": fields['firstName']}
         console.log(info)   
       res.end(util.inspect({fields:fields,files:files}))
      //res.end()
     })
  }
  else if (req.method.toLowerCase() ==='get'){
    res.writeHead( 200, {'Content-Type':'text/html'})
    fs.readFile('frontend/userregister.html', (error , html)=>{
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
  */ 
  req.on("end", function() {
    //request part is finished... we can send a response now
    console.log("send a response");
    //we will use the standardized version of the path
    let route =
      typeof routes[path] !== "undefined" ? routes[path] : routes["notFound"];
    let data = {
      path: path,
      queryString: qs,
      headers: headers,
      method: method
//      request:req
    };
    //  let request= req
    //pass data incase we need info about the request
    //pass the response object because router is outside our scope

    route(data,res);
  });
})

server.listen(port, (error)=>{
   if (error) {
    console.log('something is wrong ', error)
   } else {
    console.log('server is listening on port: ' + port )
   }
})



const routes ={
  'adminuser': function(data,res){
     let payload= {
       name: "adminuser page"
     };
     let payloadStr = JSON.stringify(payload)
     res.setHeader("Content-Type" , "application/json")
     res.setHeader("Access-Control-Allow-Origin","*") // res tells the browser to allow code from any origin to access the resource 
     res.writeHead(200)
     res.write(payloadStr)
     res.end("\n")

  },
  'frontend': function(data,res){
    console.log(stringify(data))

if (data.method.toLowerCase() ==='get'){
    res.writeHead( 200, {'Content-Type':'text/html'})
    fs.readFile('frontend/userregister.html', (error , html)=>{
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

}}