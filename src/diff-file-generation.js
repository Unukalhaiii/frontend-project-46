import findDiff from './difference-tree.js';
import toFormatData from './formatters/index.js';

const gendiff = (filepath1, filepath2, format = 'stylish') => {
  const diffArray = findDiff(filepath1, filepath2);
  return toFormatData(diffArray, format);
};

export default gendiff;
