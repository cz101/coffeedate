function retrive(){
fetch("http://localhost:5001/backend/data/", {method: "GET"})
.then(res => res.text())
.then(text => {
// console.log("Request complete! response:",text);
  const allRegUsers = JSON.parse(text); 
 // const table = document.getElementById("coffeedate");
 let username='test1'
  displayuser(allRegUsers, "coffeedate",username) 
})
}

function retriveall(){
   fetch("http://localhost:5001/backend/data/", {method: "GET"})
   .then(res => res.text())
   .then(text => {
     const allRegUsers = JSON.parse(text); 
     const username=''
    displayuser(allRegUsers, "allRegUsers",username) 
})}

function displayuser(users, tablename, username){
   const usertable = document.getElementById(tablename);
   users.map(user =>{
       if (!username ||  (user.firstName===username))
      {
         let row = usertable.insertRow();
         let id=  row.insertCell(0);
         id.innerHTML= user.id
         let firstName = row.insertCell(1);
         firstName.innerHTML = user.firstName;
         let lastName = row.insertCell(2);
         lastName.innerHTML = user.lastName;
         let email = row.insertCell(3);
         email.innerHTML = user.email;}
   })
        return usertable
}

function displayusertest (users){
   return   users.map(user =>{         
                  var rowNode = document.createElement("tr");
                  var cellNode = document.createElement("td");
                  var textNode = document.createTextNode(user.id + '\t'+ user.firstName +'\t'+user.lastName+'\t'+user.email);
                  cellNode.appendChild(textNode)
                  rowNode.appendChild(cellNode);
                  table.appendChild(rowNode)
         })
   }