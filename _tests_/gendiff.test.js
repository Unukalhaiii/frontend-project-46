import { fileURLToPath } from 'url';
import * as path from 'path';
import { dirname } from 'path';
import * as fs from 'fs';
import gendiff, { parsFunc } from '../src/functions.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

const result = `{
 - follow: false  
   host: hexlet.io  
 - proxy: 123.234.53.22  
 - timeout: 50  
 + timeout: 20  
 + verbose: true 
}`;

describe('checking the work of gendiff', () => {
  const res = parsFunc(readFile('_fixtures_/file1.json'), getFixturePath('_fixtures_/file1.json'));
  const res2 = parsFunc(readFile('_fixtures_/file2.json'), getFixturePath('_fixtures_/file2.json'));

  test('checking the result of gendiff function', () => {
    expect(gendiff(res, res2)).toEqual(result);
  });
});
