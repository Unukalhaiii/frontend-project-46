import { fileURLToPath } from 'url';
import * as path from 'path';
import { dirname } from 'path';
import * as fs from 'fs';
import gendiff from '../src/gendiff-main.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

describe.each([['stylish'], ['plain']])('%s formatter', (formatter) => {
  const expected = readFile(`__fixtures__/${formatter}.txt`);

  test.each([['json'], ['yml']])('%s files', (extension) => {
    const filepath1 = getFixturePath(`__fixtures__/file1.${extension}`);
    const filepath2 = getFixturePath(`__fixtures__/file2.${extension}`);

    const result = gendiff(filepath1, filepath2, formatter);

    expect(result).toBe(expected);
  });
});
