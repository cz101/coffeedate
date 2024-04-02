// client API Call
const retrive = async (uid) => {
   fetch(`http://localhost:5001/user/api/${uid}`, { method: "GET" })
      .then(res => res.text())
      .then(text => {
         const theUser = JSON.parse(text)
         const userInforTable = "userProfileTable"
         displayUserProfile(theUser, userInforTable)
      })
}

const retriveall = async () => {
   fetch("http://localhost:5001/user/api/alluser", { method: "GET" })
      .then(res => res.text())
      .then(text => {
         const allRegUsers = JSON.parse(text);
         const username = ''
         displayuser(allRegUsers, "allRegUsers", username)
      })
}

const deleteUser = async (id) => {
   let td = event.target.parentNode
   let tr = td.parentNode; // the row to be removed
   tr.parentNode.removeChild(tr)

   fetch(`http://localhost:5001/user/api/${id}`, { method: "DELETE" })

}

// const editUser = (id) => {
// fetch(`http://localhost:5001/user/api/${id}`, { method: "PUT" })
// .then(res => res.text())
// }
const displayUserProfile = (user, tableName) => {
   const userProfileTable = document.getElementById(tableName);
   let row = userProfileTable.insertRow();
   let i = 0
   if (user) {
      for (key in user) {
         if (user.hasOwnProperty(key) && user[key] !== null) {
            row.insertCell(i).innerHTML = user[key]
            row.insertCell(i).innerHTML
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

         modifyMethod.innerHTML = "<button id=\"deleteUserButton\" onclick=deleteUser('" + user.id + "')>Delete</button> <button id='" + user.id + "' onclick=modifiedUser('" + user.id + "')>Edit</button>"
         // modifyMethod.innerHTML = "<button id=\"deleteUserButton\" onclick=deleteUser('" + user.id + "')>Delete</button> "
         //modifyMethod.innerHTML = "<button onclick=editUser('" + user.id + "')>Edit</button>"
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



async function loadDataToTable(tableName) {

   await fetch("http://localhost:5001/user/api/alluser", { method: "GET" })
      .then(res => res.text())
      .then(text => {
         const allRegUsers = JSON.parse(text)
         console.log(allRegUsers)
         //tableBoday.innerHTML = ""
         if (allRegUsers.length > 0) {

            var temp = "";
            allRegUsers.forEach((user) => {
               temp += "<tr>";
               temp += "<td>" + user.id + "</td>";
               temp += "<td contenteditable=\"true\"><input type=\"text\"" + "value=" + user.email + ">" + "</td>";
               temp += "<td>" + user.firstName + "</td></tr>";
            });
            document.getElementById(tableName).innerHTML = temp;
         }
      })



}

const actviateEditMode = () => {
   console.log(`Im In Edit Mode Now`)
   let edidUserById = false
   let usrModifyData = [];
   const table = document.getElementById("allRegUsers");
   const rows = table.getElementsByTagName("tr")
   // const cells = table.getElementsByTagName("td")

   if (document.getElementById("actviateEditMode").innerHTML === "Activiate Edit Mode") {
      document.getElementById("actviateEditMode").innerHTML = "In Edit Mode"
      edidUserById = true

      for (let j = 0; j < rows.length; j++) {
         let rowcells = table.rows[j].cells;
         rows[j].onclick = function () {
            console.log(`im clicking row ${j}`)
            for (var i = 0; i < rowcells.length; i++) {
               console.log("the id :" + "finding " + edidUserById)
               if ((i !== 0 && i !== 1) && edidUserById) {
                  rowcells[i].onclick = function () {
                     this.setAttribute('contenteditable', 'true')
                     this.style.backgroundColor = "LightYellow"
                  }
               }
            }
         }

      }

   }
   else {
      document.getElementById("actviateEditMode").innerHTML = "Activiate Edit Mode"
      for (let r = 0, n = table.rows.length; r < n; r++) {
         for (let c = 0, m = table.rows[r].cells.length; c < m; c++) {
            if (c !== 0 && c !== 1) {
               usrModifyData.push(table.rows[r].cells[c].innerHTML)
               table.rows[r].cells[c].style.backgroundColor = "white "
            }
         }
      }
   }
   console.log(usrModifyData)
}


function modifiedUser(id) {

   const table = document.getElementById("allRegUsers");
   const rows = table.getElementsByTagName("tr")
   const cells = table.getElementsByTagName("td")
   let jsonString
   let usrHeader = ["id", "firstName", "lastName", "email", "gender", "department", "teams", "city", "availableDate", "StartingDateTime", "EndingDateTime"]
   let usrModifyData = [];
   let dataPayload = {};
   for (let j = 0; j < rows.length; j++) {
      let rowcells = table.rows[j].cells;
      let edidUserById = false
      //let usrModifyData = [];

      rows[j].onclick = function () {
         console.log(`im clicking row ${j}`)
         console.log("the id :" + id + "finding " + edidUserById)
         for (var i = 0; i < rowcells.length; i++) {
            if (document.getElementById(id).innerHTML === "Edit" && id === rowcells[1].innerHTML) {
               edidUserById = true
               document.getElementById(id).innerHTML = "Save"
               if ((i !== 0 && i !== 1) && edidUserById) {
                  rowcells[i].onclick = function () {
                     this.setAttribute('contenteditable', 'true')
                     //this.style.backgroundColor = "LightYellow" 
                  }
               }
            }
            else if (document.getElementById(id).innerHTML === "Save" && id === rowcells[1].innerHTML) {
               document.getElementById(id).innerHTML = "Edit"
            }

         }
         for (var i = 2; i < rowcells.length; i++) { usrModifyData.push(rowcells[i].innerHTML) }
         console.log("the user data :" + JSON.stringify(usrModifyData))
         jsonString = JSON.stringify(usrModifyData);



         for (let i = 0; i < usrHeader.length; i++) {
            dataPayload[usrHeader[i]] = usrModifyData[i];
         }
         console.log("the user data :" + JSON.stringify(dataPayload))
      }
   }
   // fetch(`http://localhost:5001/user/api/${id}`, { method: "DELETE" })
   fetch(`http://localhost:5001/user/api/${id}`, { method: "PUT" })
      .then(response => {
         if (!response.ok) {
            throw new Error(`HTTP error ${response.status}`);
         }
         return response.json();
      })
      .then(updatedData => {
         console.log('Data updated:', updatedData);
      })
      .catch(error => {
         console.log("'Error updating data:'" + error);
      });

      .then(res => res.text())
      .then(text => {
         const allRegUsers = JSON.parse(text);
         const username = ''
         displayuser(allRegUsers, "allRegUsers", username)
      })

}

function checkID(row, id) {
   let rowcells = table.row.cells;
   for (let i = 0; i < rowcells.length; i++)

      console.log(rowcells[i].value)
   return (rowcells[i].value === id) ? true : false


}