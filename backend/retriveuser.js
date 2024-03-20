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
//    fetch(`http://localhost:5001/user/api/${id}`, { method: "PUT" })
//       .then(res => res.text())
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

         modifyMethod.innerHTML = "<button onclick=deleteUser('" + user.id + "')>Delete</button>  <button onclick=editUser('" + user.id + "')>Edit</button>"
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

function editUser(id) {
   const table = document.getElementById("allRegUsers");
   //console.log(id + ":" + tableName)
   //const rows = table.getElementsByTagName("tr")
   const cells = table.getElementsByTagName("td")

   console.log("the cell totall length is :" + cells.length)


   for (var i = 0; i < cells.length; i++) {

      console.log("the i :" + i)
      if ((i !== 0 && i !== 1) && (i % 13 !== 0) && (i % 13 !== 1)) {

         cells[i].onclick = function () {
            console.log("the cell i click right now :" + i)
            if (this.hasAttribute('data-clicked')) { return; }

            this.setAttribute('data-clicked', 'yes')
            this.setAttribute('data-text', this.innerHTML)
            let input = document.createElement('input')
            input.setAttribute('type', 'text');
            input.value = this.innerHTML;
            input.style.backgroundColor = "LightYellow"

            input.onblur = function () {
               let td = input.parentElement
               let orig_text = input.parentElement.getAttribute('data-text')
               let current_text = this.value


               if (orig_text !== current_text) {
                  td.removeAttribute('data-clicked');
                  td.removeAttribute('data-text');
                  td.innerHTML = current_text;
               }
               else {
                  td.removeAttribute('data-clicked');
                  td.removeAttribute('data-text');
                  td.innerHTML = orig_text;

               }

            }
            this.innerHTML = ''
            this.append(input)
            this.firstElementChild.select()
         }
      }
   }

}


