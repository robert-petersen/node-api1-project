const shortid = require('shortid')

let users = [
  { id: shortid.generate(), name: 'Captain Crunch', bio: "cereal man" },
  { id: shortid.generate(), name: 'Rob', bio: "i made this" },
]

module.exports = {
  findAll() {
    // SELECT * FROM user;
    return Promise.resolve(users)
  }, // findAll().then().catch()

  findById(id) {
    // SELECT * FROM user WHERE id = 1;
    const user = users.find(u => u.id === id)
    return Promise.resolve(user)
  },

  create({ name, bio }) {
    // INSERT INTO user (id, name, bio) VALUES ('xyz', 'Foo', "bio");
    const newUser = { id: shortid.generate(), name, bio}
    users.push(newUser)
    return Promise.resolve(newUser)
  },

  update(id, changes) {
    // UPDATE users SET name = 'Foo', bio = "bio" WHERE id = 1;
    const user = users.find(user => user.id === id)
    if (!user) return Promise.resolve(null)

    const updatedUser = { ...changes, id }
    users = users.map(u => (u.id === id) ? updatedUser : u)
    return Promise.resolve(updatedUser)
  },

  delete(id) {
    // DELETE FROM dogs WHERE id = 1;
    const user = users.find(user => user.id === id)
    if (!user) return Promise.resolve(null)

    users = users.filter(u => u.id !== id)
    return Promise.resolve(user)
  }
}