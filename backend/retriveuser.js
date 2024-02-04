
// client JS 
const retrive = () => {
   fetch("http://localhost:5001/backend/data/", { method: "GET" })
      .then(res => res.text())
      .then(text => {
         console.log(" Download users complete! users are \n:", text);
         const allRegUsers = JSON.parse(text);
         let username = '1' // to do need dynamic
         displayuser(allRegUsers, "coffeedate", username)
      })
}

const retriveall = () => {
   fetch("http://localhost:5001/backend/data/", { method: "GET" })
      .then(res => res.text())
      .then(text => {
         const allRegUsers = JSON.parse(text);
         // console.log("the length : " + allRegUsers.length)
         const username = ''
         displayuser(allRegUsers, "allRegUsers", username)
      })
}

const displayuser = (users, tableName, userName) => {
   const userTable = document.getElementById(tableName);
   users.map(user => {
      console.log("the user firsName :" + user.firstName + " : " + userName)
      let row = userTable.insertRow();
      if (!userName) {
         let modifyMethod = row.insertCell(0);
         modifyMethod.innerHTML = "<button onclick=deleteUser('" + user.id + "')>Delete</button>"
         let i = 1
         for (key in user) {
            if (user.hasOwnProperty(key) && user[key] !== null) {
               row.insertCell(i).innerHTML = user[key]
               i++
            }
         }
      }
      else if (user.firstName === userName) {
         console.log("the user is :" + user.firstName)
         let i = 0
         for (key in user) {
            if (user.hasOwnProperty(key) && user[key] !== null) {
               row.insertCell(i).innerHTML = user[key]
               i++
            }
         }
      }
   })
   return userTable
};

const displayusertest = (users) => {
   return users.map(user => {
      var rowNode = document.createElement("tr");
      var cellNode = document.createElement("td");
      var textNode = document.createTextNode(user.id + '\t' + user.firstName + '\t' + user.lastName + '\t' + user.email);
      cellNode.appendChild(textNode)
      rowNode.appendChild(cellNode);
      table.appendChild(rowNode)
   })
}

const deleteUser = (id) => {
   // let td = event.target.parentNode
   // let tr = td.parentNode; // the row to be removed
   // tr.parentNode.removeChild(tr)

   fetch(`http://localhost:5001/user/employee/${id}`, { method: "DELETE" })
      .then(res => res.text())
      .then(text => {
         const allRegUsers = JSON.parse(text);
         return allRegUsers
      })

   retriveall()
   // checking why it is not auto refresing???
}


