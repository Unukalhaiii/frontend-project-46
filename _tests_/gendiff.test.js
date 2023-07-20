import { fileURLToPath } from 'url';
import * as path from 'path';
import * as yaml from 'js-yaml';
import { dirname } from 'path';
import * as fs from 'fs';
import { newDoc, takeObjectFromDoc } from '../src/functions.js';
import parsFunc from '../src/parsers.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

const result = ` - follow: false  
   host: hexlet.io  
 - proxy: 123.234.53.22  
 - timeout: 50  
 + timeout: 20  
 + verbose: true `;

describe('1-checking the work of readFile', () => {
  test('When we get some way', () => {
    const res = readFile('file1.json');
    expect(typeof res).toEqual('string');
  });
});

describe('2-checking the type result of TakeObjectFromDoc', () => {
  const res1 = JSON.parse(readFile('file1.json'));
  const res2 = yaml.load(readFile('file2.yml'));
  const obj1 = takeObjectFromDoc('file1.json');
  const obj2 = takeObjectFromDoc('file2.yml');
  const obj3 = takeObjectFromDoc(getFixturePath('file1.json'));

  test('Cheking type of result', () => {
    expect(typeof obj1).toEqual('object');
    expect(typeof obj2).toEqual('object');
    expect(typeof obj3).toEqual('object');
  });
  test('checking the result for compliance with the expected', () => {
    expect(obj1).toEqual(res1);
    expect(obj3).toEqual(res1);
    expect(obj2).toEqual(res2);
  });
  test('checking for exceptions', () => {
    expect(() => takeObjectFromDoc('file1.js')).toThrow();
  });
});

describe('3-checking the work of newDoc', () => {
  const res1 = parsFunc(readFile('_fixtures_/file1.json'), getFixturePath('_fixtures_/file1.json'));
  const res2 = parsFunc(readFile('_fixtures_/file2.json'), getFixturePath('_fixtures_/file2.json'));

  test('Cheking type of result', () => {
    expect(typeof res1).toEqual('object');
  });
  test('checking for exceptions', () => {
    expect(() => takeObjectFromDoc('file1.js', 'file2.js')).toThrow();
  });
  test('checking the result for compliance with the expected', () => {
    expect(newDoc(res1, res2)).toEqual(result);
  });
});
