import { findDiff } from './gendiff-logic.js';
import toFormatDoc from './formatters/index.js';

const gendiff = (filepath1, filepath2, format = 'stylish') => {
  const preResult = findDiff(filepath1, filepath2);
  return toFormatDoc(preResult, format);
};

export default gendiff;
