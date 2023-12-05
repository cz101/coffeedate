
// // insert the data to the table 
// require('dotenv').config();



// async function connectdb() {
//   const {MongoClient} = require('mongodb');
//   const dbuser = process.env.dbusername;
//   const password = process.env.dbpassword;
//   const uri = `mongodb+srv://${dbuser}:${password}@cluster0.ups2ujp.mongodb.net/`;
//   const client = new MongoClient(uri);
//   try {
//       // Connect to the MongoDB cluster
//       await client.connect();

//       // Make the appropriate DB calls
//       await  listDatabases(client);

//   } catch (e) {
//       console.error(e);
//   } finally {
//       await client.close();
//   }
// }

// async function listDatabases(client){
//   try { databasesList = await client.db().admin().listDatabases();
//   //console.log("Databases:");
//   databasesList.databases.forEach(db => console.log(` - ${db.name}`));
//   } catch (e) { console.error(e);}
//   finally {
//     await client.close();
//   }
// };

// const  coffeeRegUser = (formid) => {

//   const form = document.getElementById(formid);
//   const submitter = document.querySelector("button[value=register]");
//   const formData = new FormData(form, submitter);

 

//   for (const [key, value] of formData) {
//      console.log("data"+`${key}: ${value}\n`);
//   }
  

//   return ""
// }

//let form = document.forms["registerform"];

// form.addEventListener("submit", getValues);
// function getValues(event){
//   event.preventDefault();
//   console.log('test')

// }	

//coffeeRegUser('registerform')

//const inputs = document.getElementById("registerform").elements;

// Iterate over the form controls
// for (let i = 0; i < inputs.length; i++) {
//   if (inputs[i].nodeName === "INPUT" && inputs[i].type === "text") {
//     // Update text input
//      constrol.log('test')
//   }
// }

// function testResults (form) {
//   let inputValue = form.inputbox.value;
//   let formData = new FormData(form);
//   let object = {};
//   formData.forEach(function(value, key){
//     object[key] = value;
//   });
//   var json = JSON.stringify(object);
//   alert(json);

//   alert(JSON.stringify(Object.fromEntries(formData)));
// }
// testResults("registerform")
//connectdb() 
/* to do  
   get the data from form   
   insert data to db 
   display on admin table
*/
//const form = document.getElementById('registerform');

//https://www.codementor.io/@ziad-saab/let-s-code-a-web-server-from-scratch-with-nodejs-streams-h4uc9utji
function registerUser() {
  const form = document.getElementById("registerform");
    form.addEventListener("submit",  (event) => {
      // stop form submission
      event.preventDefault();
     // console.log("here I am ")
      const data = new FormData(event.target);
      const dataObject = Object.fromEntries(data.entries());
      console.log(dataObject);
})}
