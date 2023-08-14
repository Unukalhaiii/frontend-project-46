import findDiff from './difference-tree.js';
import convertData from './formatters/index.js';
import { takeDataFromFile } from './gendiff-subfunctions.js';

const gendiff = (filepath1, filepath2, format = 'stylish') => {
  const data1 = takeDataFromFile(filepath1);
  const data2 = takeDataFromFile(filepath2);
  const diffTree = findDiff(data1, data2);
  return convertData(diffTree, format);
};

export default gendiff;
