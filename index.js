const server = require("./api/server")

server.listen(5000, ()=> {
  console.log("Listening on 5000")
})


// notes for later
// why is listen not being seen as a function when i "npm start"