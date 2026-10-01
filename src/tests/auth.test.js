require('./setup');
const request = require('supertest');
const app = require('../../server'); 
const mongoose = require('mongoose');
require('./setup');

jest.setTimeout(30000);

 // ...
describe('Auth Endpoints', () => {
  it('POST /api/auth/register - should register', async () => {
    const res = await request(app).post('/api/auth/register').send({
      name: 'Raliat',
      email: 'raliat@test.com',
      password: 'password123'
    });
    expect([201, 200]).toContain(res.statusCode);
  });

  it('POST /api/auth/login - should login', async () => {
    await request(app).post('/api/auth/register').send({
      name: 'Raliat',
      email: 'raliat@test.com',
      password: 'password123'
    });
    const res = await request(app).post('/api/auth/login').send({
      email: 'raliat@test.com',
      password: 'password123'
    });
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('token');
  });
});