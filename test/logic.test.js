const test = require('node:test');
const assert = require('node:assert');
const { computeBmi, bmiCategory } = require('../src/logic');

test('70 kg at 175 cm gives a BMI of 22.9', () => {
  assert.strictEqual(computeBmi(70, 175), 22.9);
});

test('50 kg at 160 cm gives a BMI of 19.5', () => {
  assert.strictEqual(computeBmi(50, 160), 19.5);
});

test('a BMI of 17 is Underweight', () => {
  assert.strictEqual(bmiCategory(17), 'Underweight');
});

test('a BMI of 22.9 is Normal weight', () => {
  assert.strictEqual(bmiCategory(22.9), 'Normal weight');
});

test('a BMI of 27 is Overweight', () => {
  assert.strictEqual(bmiCategory(27), 'Overweight');
});

test('a BMI of 30 is Obese', () => {
  assert.strictEqual(bmiCategory(30), 'Obese');
});

test('a weight of 0 is not allowed', () => {
  assert.throws(() => computeBmi(0, 170));
});

test('a negative height is not allowed', () => {
  assert.throws(() => computeBmi(60, -170));
});

test('a BMI of 0 has no category', () => {
  assert.throws(() => bmiCategory(0));
});
