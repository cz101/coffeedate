const http = require ('http')
const fs= require('fs')
const url = require('url')
const util= require('util')
const StringDecoder = require('string_decoder').StringDecoder // dealing the request as data object

const formidable = require ('formidable') // dealing the request data format in
const { stringify } = require('querystring')

const port = 3000
const server = http.createServer( function (req, res)  {

  let parsedURL = url.parse(req.url, true);
  let path = parsedURL.pathname;
  path = path.replace(/^\/+|\/+$/g, "");
   // console.log(path)

  let qs = parsedURL.query;
  let headers = req.headers;
  let method = req.method.toLowerCase();
  let decoder = new StringDecoder('utf-8')


 // req.on("data", function() {
    console.log("got some data : ");    
  //  buffer += decoder.write(incomingdata)
  if (req.method.toLowerCase() ==='get'){
    res.writeHead( 200, {'Content-Type':'text/html'})
    fs.readFile('user/userregister.html', (error , html)=>{
      if(error){
        res.writeHead(404)
        res.write('Error : File Not Found')
      }
      else{
        res.write(html)
      }
      res.end()
    })}
   else if(req.method.toLowerCase()==='post'){

      let form =  new formidable.IncomingForm()
    
      form.parse(req, function (error, fields, files){
          if(error){
             console.log(error.messge)
             return ;
          }
          res.writeHead(200, {'Content-Type':'text/plain'})
          //console.log(util.inspect({fields:fields[lastName],files:files}))
          console.log("------------------------\n" )
          console.log("----------------formdata------------------->" + stringify(form)+'\n\n')
          console.log("-------------------------\n" )
          let info = {
              "firstName": fields['firstName']}
           console.log(info)   
         res.end(util.inspect({fields:fields,files:files}))
        //res.end()
       })
    }

  });
//   req.on("end", function() {
//     //buffer += decoder.end()
//     let route = typeof routes[path] !== "undefined" ? routes[path] : routes["notFound"];
//     let data = {
//       path: path,
//       queryString: qs,
//       headers: headers,
//       method: method,
//       incomingReq: req
//     };
//     //  let request= req
//     //pass data incase we need info about the request
//     //pass the response object because router is outside our scope

//     route(data,res);
//   });
// })

server.listen(port, (error)=>{
   if (error) {
       console.log('something is wrong ', error)
   } else {
       console.log('server is listening on port: ' + port )
   }
})



// const routes ={
//   'adminuser/admin': function(data,res){
//      let payload= {
//        name: "adminuser page"
//      };
//      let payloadStr = JSON.stringify(payload)
//      res.setHeader("Content-Type" , "application/json")
//      res.setHeader("Access-Control-Allow-Origin","*") // res tells the browser to allow code from any origin to access the resource 
//      res.writeHead(200)
//      res.write(payloadStr)
//      res.end("\n")

//   },
//   'user/userprofile.html': function(data,res){
//     console.log("1 ==>"+(data.payload))
    // if (data.method.toLowerCase() ==='get'){
    // res.writeHead( 200, {'Content-Type':'text/html'})
    // fs.readFile('user/userregister.html', (error , html)=>{
    //   if(error){
    //     res.writeHead(404)
    //     res.write('Error : File Not Found')
    //   }
    //   else{
    //     res.write(html)
    //   }
    //   res.end()
    // })}
//     else if(data.method.toLowerCase()==='post'){
//       console.log("post the data : "+ (data.payload))
  
//       let form =  new formidable.IncomingForm('')
       
//        form.parse(data.incomingReq, function (error, fields, files){
//            if(error){
//               console.log(error.messge)
//               return ;
//            }
//            res.writeHead(200, {'Content-Type':'text/plain'})
//            //console.log(util.inspect({fields:fields[lastName],files:files}))
   
//            let info = {
//                "firstName": fields['firstName']}
//             console.log("---------------------------"+info)   
//             res.end(util.inspect({fields:fields,files:files}))
//          //res.end()
//         })
//     //   let form =  stringify(data)
//     //  // console.log(stringify(form))
//     //   writeHead(200, {'Content-Type':'text/plain'})
//     //       //console.log(util.inspect({fields:fields[lastName],files:files}))
  
//     //       let info = {
//     //           "firstName": fields['firstName']}
//     //        console.log(info)   
//     //      res.end(util.inspect({fields:fields,files:files}))
//     //     //res.end()
//     //    )
//     // }
  
  
  
//   }},
//   'notFound': function(data, res) {
//     //this one gets called if no route matches
//     let payload = {
//       message: "File Not Found",
//       code: 404
//     };
//     let payloadStr = JSON.stringify(payload);
//     res.setHeader("Content-Type", "application/json");
//     res.setHeader("Access-Control-Allow-Origin", "*");
//     res.writeHead(404);
//     res.write(payloadStr);
//     res.end("\n");
//   }
// }



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