const http = require("http");
const fs = require("fs");
const formidable = require("formidable"); // lib easily parsing the form data
const {
  getAllUsers,
  getUserById,
  createUser,
  deleteUser,
  registNewuser,
  getCssFile,
  getJSFile,
  adminUser,
  employeeProfile,
  editUser,
} = require("../backend/controller/userController");
const user = require("./data/users");

const server = http.createServer((req, res) => {
  // to do dynamic routing
  // console.log("going to:"+ req.url)

  // Static routing
  if (req.url && req.method.toLowerCase() === "get") {
    if (req.url === "/user/api/alluser") { getAllUsers(req, res); }
    else if (req.url.match(/\/user\/api\/([a-z0-9\-]+)/)) { getUserById(req, res); }
    else if (req.url === "/user/adminuser") { adminUser(req, res); }
    else if (req.url.match(/\/user\/employee\/([a-z0-9\-]+)/)) { employeeProfile(req, res); }
    else if (req.url === "/user/userregister") { registNewuser(req, res); }
    else if (req.url === "/user/css/user.css") { getCssFile(req, res); }
    else if (req.url === "/backend/retriveuser.js") { getJSFile(req, res); }
    else {
      res.writeHead(404);
      res.write("Error: the current page is not avaible");
      res.end();
    }
  } else if (req.url === "/user/userregister" && req.method.toLowerCase() === "post") {
    let form = new formidable.IncomingForm();
    createUser(req, res, form);
    //createNewUser(req,res)
  }
  else if (req.method.toLowerCase() === "put" && req.url.match(/\/user\/api\/([a-z0-9\-]+)/)) {
    editUser(req, res);
  } else if (req.method.toLowerCase() === "delete" && req.url.match(/\/user\/api\/([a-z0-9\-]+)/)) { deleteUser(req, res); }
});

const port = process.env.port || 5001;

server.listen(port, () => console.log(`server is currently running on the port : ${port}`));

module.exports = server;
