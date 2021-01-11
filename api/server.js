const express = require("express")
const User = require("./model")
const server = express()
server.use(express.json())

server.get("/", (req,res) => {
  res.json({message: "Hello!"})
})

server.post("/api/users", async (req, res) => {
  const newUser = req.body
  if( !newUser.name || !newUser.bio) {
    res.status(400).json({ errorMessage: "Please provide name and bio for the user." })
  } else {
    try {
      const newlyCreated = await User.create(newUser)
      res.status(201).json(newlyCreated)
    } catch {
      res.status(500).json({ errorMessage: "There was an error while saving the user to the database" })
    }
  }
})

server.get("/api/users", (req, res) => {
  User.findAll()
  .then( users => {
    res.status(200).json(users)
  })
  .catch( err => {
    res.status(500).json({ errorMessage: "The users information could not be retrieved." })
  })
})

server.get("//api/users/:id", (req, res) => {
  const id = req.params.id
  User.findById(id)
    .then( user => {
      if (!user) {
        res.status(404).json({ message: "The user with the specified ID does not exist." })
      } else {
        res.status(200).json(user)
      }
    })
    .catch( err => {
      res.status(500).json({ errorMessage: "The user information could not be retrieved." })
    })
})