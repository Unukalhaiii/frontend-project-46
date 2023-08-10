import _ from 'lodash';
import { takeObjectFromFile, chekingForObject } from './functions-for-difference-tree.js';

const findDiff = (file1, file2) => {
  const data1 = typeof file1 === 'string' ? takeObjectFromFile(file1) : file1;
  const data2 = typeof file2 === 'string' ? takeObjectFromFile(file2) : file2;

  const keys = Object.keys(data1);
  const keys2 = Object.keys(data2);
  const finishedArray = _.sortBy(_.union(keys.concat(keys2)));
  const result = finishedArray.map((item) => {
    if (keys2.includes(item)) {
      if (typeof data2[item] === 'object' && data2[item] !== null && typeof data1[item] === 'object') {
        if (typeof data1[item] === 'object') {
          const status = 'notChanged';
          const value = findDiff(data1[item], data2[item]);
          return { item, status, value };
        }
        const status = 'added';
        const value = data2[item];
        return { item, status, value };
      }
      if (data2[item] === data1[item]) {
        const status = 'notChanged';
        const value = data1[item];
        return { item, status, value };
      }
      if (keys.includes(item)) {
        const status = 'updated';
        const value = chekingForObject(data1[item]);
        const value2 = chekingForObject(data2[item]);
        return {
          item, status, value, value2,
        };
      }
      const status = 'added';
      const value = chekingForObject(data2[item]);
      return { item, status, value };
    }
    const status = 'removed';
    const value = chekingForObject(data1[item]);
    return { item, status, value };
  });
  return result;
};

export default findDiff;
