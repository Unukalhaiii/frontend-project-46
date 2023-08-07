import _ from 'lodash';
import toFormatData from './formatters/index.js';
import { takeObjectFromFile, chekingForObject } from './gendiff-logic.js';

export const findDiff = (tree, tree1) => {
  const json1 = typeof tree === 'string' ? takeObjectFromFile(tree) : tree;
  const json2 = typeof tree1 === 'string' ? takeObjectFromFile(tree1) : tree1;

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

const gendiff = (filepath1, filepath2, format = 'stylish') => {
  const diffArray = findDiff(filepath1, filepath2);
  return toFormatData(diffArray, format);
};

export default gendiff;
