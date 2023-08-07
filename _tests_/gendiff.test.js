import { fileURLToPath } from 'url';
import * as path from 'path';
import { dirname } from 'path';
import * as fs from 'fs';
import toPlain from '../src/formatters/plain.js';
import toJson from '../src/formatters/json.js';
import toStylish from '../src/formatters/stylish.js';
import toFormatData from '../src/formatters/index.js';
import getResult from '../_fixtures_/expect.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

describe('1-Сhecking Stylish', () => {
  test('Сhecking the result for compliance with the expected', () => {
    expect(toStylish(getResult())).toEqual(readFile('_fixtures_/result-for-stylish.txt'));
  });
});

describe('2-Сhecking Plain', () => {
  test('Сhecking the result for compliance with the expected', () => {
    expect(toPlain(getResult())).toEqual(readFile('_fixtures_/result-for-plain.txt'));
  });
});

describe('3-Сhecking index.js', () => {
  test('Сhecking the result for compliance with the expected', () => {
    expect(toFormatData(getResult(), 'plain')).toEqual(toPlain(getResult()));
    expect(toFormatData(getResult(), 'json')).toEqual(toJson(getResult()));
    expect(toFormatData(getResult())).toEqual(toStylish(getResult(), ' ', 2));
  });
});
