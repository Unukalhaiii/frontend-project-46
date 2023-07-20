import * as fs from 'fs';
import * as path from 'path';
import _ from 'lodash';
import parsFunc from './parsers.js';

const takeObjectFromDoc = (file) => {
  const filePath = path.isAbsolute(file) ? file : path.resolve(process.cwd(), file);
  const read = fs.readFileSync(`${filePath}`, 'utf8');
  const readDoc = parsFunc(read, filePath);
  return readDoc;
};

const chekingForObject = (it) => {
  if (it === null) {
    return null;
  }
  if (typeof it === 'object') {
    const prefix = '';
    const keys = Object.keys(it);
    const newArr = keys.map((element) => {
      if (typeof it[element] === 'object') {
        const value = chekingForObject(it[element]);
        const item = element;
        return { item, prefix, value };
      }
      const value = it[element];
      const item = element;
      return { item, prefix, value };
    });
    return newArr;
  }
  return it;
};

const newDoc = (tree, tree1) => {
  const doc1 = typeof tree === 'string' ? takeObjectFromDoc(tree) : tree;
  const doc2 = typeof tree1 === 'string' ? takeObjectFromDoc(tree1) : tree1;
  const keys = Object.keys(doc1);
  const keys1 = Object.keys(doc2);
  const finishedArray = _.sortBy(_.uniq(keys.concat(keys1)));
  const result = finishedArray.flatMap((item) => {
    if (keys1.includes(item)) {
      if (typeof doc2[item] === 'object' && doc2[item] !== null && typeof doc1[item] === 'object') {
        if (typeof doc1[item] === 'object') {
          const prefix = ' ';
          const value = newDoc(doc1[item], doc2[item]);
          return ` ${prefix} ${item}: ${value} `;
        }
        const prefix = '+';
        const value = doc2[item];
        return ` ${prefix} ${item}: ${value} `;
      }
      if (doc2[item] === doc1[item]) {
        const prefix = ' ';
        const value = doc1[item];
        return ` ${prefix} ${item}: ${value} `;
      }
      if (keys.includes(item)) {
        const prefix1 = '-';
        const prefix2 = '+';
        const value = chekingForObject(doc1[item]);
        const value2 = chekingForObject(doc2[item]);
        return [
          ` ${prefix1} ${item}: ${value} `,
          ` ${prefix2} ${item}: ${value2} `,
        ];
      }
      const prefix = '+';
      const value = chekingForObject(doc2[item]);
      return ` ${prefix} ${item}: ${value} `;
    }
    if (_.isPlainObject(doc1[item])) {
      const prefix = '-';
      const value = chekingForObject(doc1[item]);
      return ` ${prefix} ${item}: ${value} `;
    }
    const prefix = '-';
    const value = chekingForObject(doc1[item]);
    return ` ${prefix} ${item}: ${value} `;
  });
  return result.join(' \n');
};

const gendiff = (filepath1, filepath2) => {
  const finalResult = newDoc(filepath1, filepath2);
  return `{\n${finalResult}\n}`;
};

export default gendiff;
export { newDoc, parsFunc, takeObjectFromDoc };
