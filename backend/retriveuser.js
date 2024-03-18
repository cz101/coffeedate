// client API Call
const retrive = (uid) => {
   fetch(`http://localhost:5001/user/api/${uid}`, { method: "GET" })
      .then(res => res.text())
      .then(text => {
         const theUser = JSON.parse(text)
         const userInforTable = "userProfileTable"
         displayUserProfile(theUser, userInforTable)
      })
}

const retriveall = () => {
   fetch("http://localhost:5001/user/api/alluser", { method: "GET" })
      .then(res => res.text())
      .then(text => {
         const allRegUsers = JSON.parse(text);
         const username = ''
         displayuser(allRegUsers, "allRegUsers", username)
      })
}

const deleteUser = (id) => {
   let td = event.target.parentNode
   let tr = td.parentNode; // the row to be removed
   tr.parentNode.removeChild(tr)

   fetch(`http://localhost:5001/user/api/${id}`, { method: "DELETE" })

}

const editUser = (id) => {

   fetch(`http://localhost:5001/user/api/${id}`, { method: "PUT" })
      .then(res => res.text())


}
const displayUserProfile = (user, tableName) => {
   const userProfileTable = document.getElementById(tableName);
   let row = userProfileTable.insertRow();
   let i = 0
   if (user) {
      for (key in user) {
         if (user.hasOwnProperty(key) && user[key] !== null) {
            row.insertCell(i).innerHTML = user[key]
         }
         i++
      }
   }
   return userProfileTable
}


const displayuser = (users, tableName, userName) => {
   const userTable = document.getElementById(tableName);
   users.map(user => {
      // console.log("the user firsName :" + user.firstName + " : " + userName)
      let row = userTable.insertRow();
      if (!userName) {
         let modifyMethod = row.insertCell(0);

         // modifyMethod.innerHTML = "<button onclick=deleteUser('" + user.id + "')>Delete</button>"
         modifyMethod.innerHTML = "<button onclick=editUser('" + user.id + "')>Edit</button>"
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

/*
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
*/



