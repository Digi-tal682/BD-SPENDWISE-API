// In-memory Expense model to match your User model
let expenses = [];
let idCounter = 1;

const Expense = {
  findByUser: (userId) => {
    return expenses.filter(exp => exp.user === userId);
  },

  find: (query) => {
    // to support Expense.find({ user: req.user.id })
    if (query && query.user) {
      return expenses.filter(exp => exp.user === query.user);
    }
    return expenses;
  },

  create: (data) => {
    const newExpense = {
      id: (idCounter++).toString(),
      _id: (idCounter).toString(), // for compatibility
      user: data.user,
      amount: data.amount,
      category: data.category,
      description: data.description,
      date: data.date || new Date(),
      createdAt: new Date(),
      updatedAt: new Date()
    };
    expenses.push(newExpense);
    return newExpense;
  }
};

module.exports = Expense;