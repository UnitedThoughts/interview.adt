import test from 'node:test';
import assert from 'node:assert';
import {make_change} from "../dist/index.js"

test('make change for 10', async (t) => {
    let change = make_change(10)
    let tens = change.find((stack) => stack.denomination.value_usd === 10)

    assert.strictEqual(change.length, 1);
    assert.strictEqual(tens.count, 1);
});

test('make change for 14.73', async (t) => {
    let change = make_change(14.73)
    assert.strictEqual(change.length, 5);

    let tens = change.find((stack) => stack.denomination.value_usd === 10)
    let ones = change.find((stack) => stack.denomination.value_usd === 1)
    let quarters = change.find((stack) => stack.denomination.value_usd === 0.25)
    let dimes = change.find((stack) => stack.denomination.value_usd === 0.10)
    let pennies = change.find((stack) => stack.denomination.value_usd === 0.01)

    assert.strictEqual(tens.count, 1, "Wrong number of tens");
    assert.strictEqual(ones.count, 4, "Wrong number of ones");
    assert.strictEqual(quarters.count, 2, "Wrong number of quarters");
    assert.strictEqual(dimes.count, 2, "Wrong number of dimes");
    assert.strictEqual(pennies.count, 3, "Wrong number of pennies");

});