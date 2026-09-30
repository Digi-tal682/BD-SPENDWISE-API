let categories = [];
let id = 1;
module.exports = {
  create: (d) => { const c = { id: String(id++), name: d.name, type: d.type, userId: d.userId }; categories.push(c); return c; },
  getAll: () => categories
}