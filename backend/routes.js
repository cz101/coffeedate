const fs= require('fs')

const routes ={

  'admin': function(data,res){
     let payload= {
       name: "admin page"
     }

     let payloadStr = JSON.stringify(payload)
     res.setHeader("Content-Type" , "applicaiton/json")
     res.setHeader("Access-Control-Allow-Origin",'*') // res tells the browser to allow code from any origin to access the resource 
     res.writeHeader(200)
     res.writeHeader(payloadStr)
     res.end()
  },
  'user': function(data,res){},

  'user/register' : function(data,res){}, 
  'nofound': function(data,res){}


}