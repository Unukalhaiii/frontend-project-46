import { fileURLToPath } from 'url';
import * as path from 'path';
import { dirname } from 'path';
import * as fs from 'fs';
import gendiff from '../src/gendiff-main.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

test.each([
  [gendiff('__fixtures__/file1.json', '__fixtures__/file2.json'), readFile('__fixtures__/result-for-stylish.txt')],
  [gendiff('__fixtures__/file1.json', '__fixtures__/file2.json', 'plain'), readFile('__fixtures__/result-for-plain.txt')],
])('checking result for json files', (recieved, expected) => {
  expect(recieved).toEqual(expected);
});

test.each([
  [gendiff('__fixtures__/file1.yaml', '__fixtures__/file2.yml'), readFile('__fixtures__/result-for-stylish.txt')],
  [gendiff('__fixtures__/file1.yaml', '__fixtures__/file2.yml', 'plain'), readFile('__fixtures__/result-for-plain.txt')],
])('checking result for yaml files', (recieved, expected) => {
  expect(recieved).toEqual(expected);
});
