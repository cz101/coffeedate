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
} = require("../backend/controller/userController");
const user = require("./data/users");

const server = http.createServer((req, res) => {
  // to do dynamic routing
  // console.log("going to:"+ req.url)

  // Static routing
  if (req.url && req.method.toLowerCase() === "get") {
    if (req.url === "/user/adminuser") {
      getAllUsers(req, res);
    } else if (req.url.match(/\/user\/employee\/([a-z0-9\-]+)/)) {
      const id = req.url.split("/")[3];
      console.log("user id is " + id);
      getUserById(req, res);
    } else if (req.url === "/user/userregister") {
      registNewuser(req, res);
    } else if (req.url === "/user/css/user.css") {
      getCssFile(req, res);
    } else if (req.url === "/backend/retriveuser.js") {
      getJSFile(req, res);
    } else if (req.url === "/backend/data/") {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(user));
    } else {
      res.writeHead(404);
      res.write("Error: the current page is not avaible");
      res.end();
    }
  } else if (req.url === "/user/userregister" && req.method.toLowerCase() === "post") {
    // console.log("creating the new user>")
    let form = new formidable.IncomingForm();
    createUser(req, res, form);
    //createNewUser(req,res)
  } else if (
    req.method.toLowerCase() === "delete" &&
    req.url.match(/\/user\/employee\/([a-z0-9\-]+)/)
  ) {
    const id = req.url.split("/")[3];
    //console.log("the id to be delete "+ id)
    deleteUser(req, res, id);
  }
});

const port = process.env.port || 5001;

server.listen(port, () => console.log(`server is currently running on the port : ${port}`));

function dynamicRoutePath(incomingPath) {
  const dpath = "";

  const parsedURL = url.parse(incomingPath, true);
  dpath = parsedURL.pathname;
  dpath = path.replace(/^\/+|\/+$/g, "");
  console.log(dpath);

  return dpath;
}

module.exports = server;
