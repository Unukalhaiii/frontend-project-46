import * as fs from 'fs';
import * as path from 'path';
import _ from 'lodash';
import parseDoc from './parsers.js';

export const getFormat = (filePath) => path.extname(filePath).slice(1);

export const takeObjectFromDoc = (file) => {
  const filePath = path.isAbsolute(file) ? file : path.resolve(process.cwd(), file);
  const fileContent = fs.readFileSync(`${filePath}`, 'utf8');
  const format = getFormat(filePath);
  const readDoc = parseDoc(fileContent, format);
  return readDoc;
};

export const chekingForObject = (it) => {
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

export const findDiff = (tree, tree1) => {
  const json1 = typeof tree === 'string' ? takeObjectFromDoc(tree) : tree;
  const json2 = typeof tree1 === 'string' ? takeObjectFromDoc(tree1) : tree1;

  const keys = Object.keys(json1);
  const keys2 = Object.keys(json2);
  const finishedArray = _.sortBy(_.uniq(keys.concat(keys2)));
  const result = finishedArray.map((item) => {
    if (keys2.includes(item)) {
      if (typeof json2[item] === 'object' && json2[item] !== null && typeof json1[item] === 'object') {
        if (typeof json1[item] === 'object') {
          const prefix = 'notChanged';
          const value = findDiff(json1[item], json2[item]);
          return { item, prefix, value };
        }
        const prefix = 'added';
        const value = json2[item];
        return { item, prefix, value };
      }
      if (json2[item] === json1[item]) {
        const prefix = 'notChanged';
        const value = json1[item];
        return { item, prefix, value };
      }
      if (keys.includes(item)) {
        const prefix = 'updated';
        const value = chekingForObject(json1[item]);
        const value2 = chekingForObject(json2[item]);
        return {
          item, prefix, value, value2,
        };
      }
      const prefix = 'added';
      const value = chekingForObject(json2[item]);
      return { item, prefix, value };
    }
    if (_.isPlainObject(json1[item])) {
      const prefix = 'removed';
      const value = chekingForObject(json1[item]);
      return { item, prefix, value };
    }
    const prefix = 'removed';
    const value = chekingForObject(json1[item]);
    return { item, prefix, value };
  });
  return result;
};
