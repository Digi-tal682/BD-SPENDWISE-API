const axios = require('axios');
const API = 'http://localhost:5000/api';

async function demo() {
  try {
    console.log('1. Registering user...');
    await axios.post(`${API}/auth/register`, {
      name: 'Raliat Demo',
      email: `raliat${Date.now()}@test.com`,
      password: '123456'
    }).catch(() => console.log('   User exists, continuing...'));

    console.log('2. Logging in...');
    const login = await axios.post(`${API}/auth/login`, {
      email: 'raliat@test.com',
      password: '123456'
    }).catch(async () => {
      // if previous login fails, register fresh
      const email = `demo${Date.now()}@test.com`;
      await axios.post(`${API}/auth/register`, { name: 'Demo', email, password: '123456' });
      return await axios.post(`${API}/auth/login`, { email, password: '123456' });
    });

    const token = login.data.token;
    console.log('   Token received:', token.slice(0,20)+'...');

    console.log('3. Adding expense...');
    const expense = await axios.post(`${API}/expenses`, {
      title: 'Lunch',
      amount: 2500,
      category: 'Food'
    }, { headers: { Authorization: `Bearer ${token}` }});
    console.log('   Expense added:', expense.data);

    console.log('4. Getting all expenses...');
    const all = await axios.get(`${API}/expenses`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    console.log('   Expenses:', all.data);

    console.log('\nDEMO SUCCESSFUL ✅');

  } catch (err) {
    console.error('Demo failed:', err.response?.data || err.message);
  }
}

demo();