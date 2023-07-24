import { fileURLToPath } from 'url';
import * as path from 'path';
import { dirname } from 'path';
import * as fs from 'fs';
import { newResd, takeObjectFromJson } from '../src/functions.js';
import parsFunc from '../src/parsers.js';
import toPlain from '../formatters/plain.js';
import toJson from '../formatters/json.js';
import toStylish from '../formatters/stylish.js';
import chooseFormat from '../formatters/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

const resulted = [
  {
    item: 'common',
    prefix: 'notChanged',
    value: [
      { item: 'follow', prefix: 'added', value: false },
      { item: 'setting1', prefix: 'notChanged', value: 'Value 1' },
      { item: 'setting2', prefix: 'removed', value: 200 },
      {
        item: 'setting3', prefix: 'updated', value: true, value2: null,
      },
      { item: 'setting4', prefix: 'added', value: 'blah blah' },
      { item: 'setting5', prefix: 'added', value: [{ item: 'key5', prefix: '', value: 'value5' }] },
      {
        item: 'setting6',
        prefix: 'notChanged',
        value: [
          {
            item: 'doge',
            prefix: 'notChanged',
            value: [
              {
                item: 'wow', prefix: 'updated', value: '', value2: 'so much',
              },
            ],
          },
          { item: 'key', prefix: 'notChanged', value: 'value' },
          { item: 'ops', prefix: 'added', value: 'vops' },
        ],
      },
    ],
  },
  {
    item: 'group1',
    prefix: 'notChanged',
    value: [
      {
        item: 'baz', prefix: 'updated', value: 'bas', value2: 'bars',
      },
      { item: 'foo', prefix: 'notChanged', value: 'bar' },
      {
        item: 'nest', prefix: 'updated', value: [{ item: 'key', prefix: '', value: 'value' }], value2: 'str',
      },
    ],
  },
  {
    item: 'group2',
    prefix: 'removed',
    value: [
      { item: 'abc', prefix: '', value: 12345 },
      { item: 'deep', prefix: '', value: [{ item: 'id', prefix: '', value: 45 }] },
    ],
  },
  {
    item: 'group3',
    prefix: 'added',
    value: [
      { item: 'deep', prefix: '', value: [{ item: 'id', prefix: '', value: [{ item: 'number', prefix: '', value: 45 }] }] },
      { item: 'fee', prefix: '', value: 100500 },
    ],
  },
];

const resultOfToJson = '[{"item":"common","prefix":"notChanged","value":[{"item":"follow","prefix":"added","value":false},{"item":"setting1","prefix":"notChanged","value":"Value 1"},{"item":"setting2","prefix":"removed","value":200},{"item":"setting3","prefix":"updated","value":true,"value2":null},{"item":"setting4","prefix":"added","value":"blah blah"},{"item":"setting5","prefix":"added","value":[{"item":"key5","prefix":"","value":"value5"}]},{"item":"setting6","prefix":"notChanged","value":[{"item":"doge","prefix":"notChanged","value":[{"item":"wow","prefix":"updated","value":"","value2":"so much"}]},{"item":"key","prefix":"notChanged","value":"value"},{"item":"ops","prefix":"added","value":"vops"}]}]},{"item":"group1","prefix":"notChanged","value":[{"item":"baz","prefix":"updated","value":"bas","value2":"bars"},{"item":"foo","prefix":"notChanged","value":"bar"},{"item":"nest","prefix":"updated","value":[{"item":"key","prefix":"","value":"value"}],"value2":"str"}]},{"item":"group2","prefix":"removed","value":[{"item":"abc","prefix":"","value":12345},{"item":"deep","prefix":"","value":[{"item":"id","prefix":"","value":45}]}]},{"item":"group3","prefix":"added","value":[{"item":"deep","prefix":"","value":[{"item":"id","prefix":"","value":[{"item":"number","prefix":"","value":45}]}]},{"item":"fee","prefix":"","value":100500}]}]';

const resultOfToStylish = 
`{
   common: {
   + follow: false
     setting1: Value 1
   - setting2: 200
  }
}`

    
const resultOfToPlain = [
        "Property 'common.follow' was added with value: false",
        "Property 'common.setting2' was removed",
        "Property 'common.setting3' was updated. From true to null",
        "Property 'common.setting4' was added with value: 'blah blah'",
        "Property 'common.setting5' was added with value: [complex value]",
        "Property 'common.setting6.doge.wow' was updated. From '' to 'so much'",
        "Property 'common.setting6.ops' was added with value: 'vops'",
        "Property 'group1.baz' was updated. From 'bas' to 'bars'",
        "Property 'group1.nest' was updated. From [complex value] to 'str'",
        "Property 'group2' was removed",
        "Property 'group3' was added with value: [complex value]",
];


const resultedForTestsOfParser = {
  common: {
    setting1: 'Value 1',
    setting2: 200,
    setting3: true,
    setting6: { key: 'value', doge: { wow: '' } },
  },
  group1: { baz: 'bas', foo: 'bar', nest: { key: 'value' } },
  group2: { abc: 12345, deep: { id: 45 } },
};

describe('1-Сhecking the work of readFile', () => {
  test('When we get some path', () => {
    const res = readFile('file1.json');
    expect(typeof res).toEqual('string');
  });
});

describe('2-Сhecking the type result of TakeObjectFromJson', () => {
  const res = JSON.parse(readFile('file1.json'));
  const res2 = JSON.parse(readFile('file2.json'));
  const obj = takeObjectFromJson('file1.json');
  const obj2 = takeObjectFromJson('file2.json');
  const obj3 = takeObjectFromJson(getFixturePath('file1.json'));

  test('Cheking type of result', () => {
    expect(typeof obj).toEqual('object');
    expect(typeof obj2).toEqual('object');
    expect(typeof obj3).toEqual('object');
  });
  test('Сhecking the result for compliance with the expected', () => {
    expect(obj).toEqual(res);
    expect(obj3).toEqual(res);
    expect(obj2).toEqual(res2);
  });
  test('Сhecking for exceptions', () => {
    expect(() => takeObjectFromJson('file1.js')).toThrow();
  });
});

describe('3-Сhecking the newResd', () => {
  const res = parsFunc(readFile('_fixtures_/file1.json'), getFixturePath('_fixtures_/file1.json'));
  const res2 = parsFunc(readFile('_fixtures_/file2.json'), getFixturePath('_fixtures_/file2.json'));

  test('Cheking type of result', () => {
    expect(typeof res).toEqual('object');
  });
  test('Сhecking for exceptions', () => {
    expect(() => takeObjectFromJson('file1.js', 'file2.js')).toThrow();
  });
  test('Сhecking the result for compliance with the expected', () => {
    expect(resulted).toEqual(newResd(res, res2));
  });
});

describe('4-Сhecking the Parsers', () => {
  const res = parsFunc(readFile('_fixtures_/file1.json'), getFixturePath('_fixtures_/file1.json'));
  const res2 = parsFunc(readFile('_fixtures_/file1.yaml'), getFixturePath('_fixtures_/file1.yaml'));

  test('Cheking type of result', () => {
    expect(typeof res).toEqual('object');
    expect(typeof res2).toEqual('object');
  });
  test('Сhecking the result for compliance with the expected', () => {
    expect(resultedForTestsOfParser).toEqual(res2);
  });
  test('Сhecking for exceptions', () => {
    expect(() => parsFunc(readFile('file1.ml'), getFixturePath('file1.ml'))).toThrow();
  });
});

describe('5-Сhecking the Stylish', () => {
    test('Сhecking the result for compliance with the expected', () => {
      expect(toStylish([
        {
          item: 'common',
          prefix: 'notChanged',
          value: [
            { item: 'follow', prefix: 'added', value: false },
            { item: 'setting1', prefix: 'notChanged', value: 'Value 1' },
            { item: 'setting2', prefix: 'removed', value: 200 },
          ],
        }])).toEqual(resultOfToStylish);
    });
});
  
describe('6-Сhecking the Plain', () => {
    test('Сhecking the result for compliance with the expected', () => {
      expect(toPlain(resulted)).toEqual(resultOfToPlain.join('\n'));
    });
});

describe('7-Сhecking index.js', () => {
    test('Сhecking the result for compliance with the expected', () => {
      expect(chooseFormat(resulted, 'plain')).toEqual(resultOfToPlain.join('\n'));
      expect(chooseFormat(resulted, 'json')).toEqual(resultOfToJson);
      expect(chooseFormat(resulted)).toEqual(toStylish(resulted, ' ', 2));
    });
  });