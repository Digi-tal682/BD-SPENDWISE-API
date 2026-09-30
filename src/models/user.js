let users = [];
let id = 1;
module.exports = {
  create: (d) => { const u = { id: String(id++), name: d.name, email: d.email, password: d.password, createdAt: new Date() }; users.push(u); return u; },
  findByEmail: (email) => users.find(u => u.email === email),
  findById: (id) => users.find(u => u.id === id)
}