require('./setup');
const request = require('supertest');
const app = require('../../server');

let token;

beforeEach(async () => {
  await request(app).post('/api/auth/register').send({
    name: 'Faith',
    email: 'faith@test.com',
    password: 'password123'
  });
  const res = await request(app).post('/api/auth/login').send({
    email: 'faith@test.com',
    password: 'password123'
  });
  token = res.body.token;
}, 20000);

describe('Expenses', () => {
  it('POST /api/expenses - create', async () => {
    const res = await request(app)
      .post('/api/expenses')
      .set('Authorization', `Bearer ${token}`)
      .send({ title: 'Lunch', amount: 5000, category: 'Food' });
    expect([201, 200]).toContain(res.statusCode);
  }, 20000);

  it('GET /api/expenses - get all', async () => {
    const res = await request(app)
      .get('/api/expenses')
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
  }, 20000);
});