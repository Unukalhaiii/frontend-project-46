import { fileURLToPath } from 'url';
import * as path from 'path';
import { dirname } from 'path';
import * as fs from 'fs';
import toPlain from '../src/formatters/plain.js';
import toJson from '../src/formatters/json.js';
import toStylish from '../src/formatters/stylish.js';
import toFormatData from '../src/formatters/index.js';
import getResult from '../__fixtures__/expect.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

test.each([
  [toStylish(getResult()), readFile('__fixtures__/result-for-stylish.txt')],
  [toPlain(getResult()), readFile('__fixtures__/result-for-plain.txt')],
])('checking result for formatters', (recieved, expected) => {
  expect(recieved).toEqual(expected);
});

test.each([
  [toFormatData(getResult(), 'plain'), toPlain(getResult())],
  [toFormatData(getResult(), 'json'), toJson(getResult())],
  [toFormatData(getResult()), toStylish(getResult(), ' ', 2)],
])('checking result for different formats', (recieved, expected) => {
  expect(recieved).toEqual(expected);
});
