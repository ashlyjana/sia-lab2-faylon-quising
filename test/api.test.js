const test = require('node:test');
const assert = require('node:assert');
const app = require('../src/app');

let server;
let baseUrl;

test.before(() => {
  server = app.listen(0);
  baseUrl = 'http://localhost:' + server.address().port;
});

test.after(() => {
  server.close();
});

test('GET /health says the app is ok', async () => {
  const response = await fetch(baseUrl + '/health');
  const data = await response.json();
  assert.strictEqual(response.status, 200);
  assert.strictEqual(data.status, 'ok');
});

test('POST /api/calculate gives the correct BMI and category', async () => {
  const response = await fetch(baseUrl + '/api/calculate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ weight: 70, height: 175 })
  });
  const data = await response.json();
  assert.strictEqual(data.bmi, 22.9);
  assert.strictEqual(data.category, 'Normal weight');
});

test('POST /api/calculate rejects an empty weight with an error', async () => {
  const response = await fetch(baseUrl + '/api/calculate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ weight: '', height: 175 })
  });
  const data = await response.json();
  assert.strictEqual(response.status, 400);
  assert.strictEqual(data.error, 'Weight must be more than 0');
});
