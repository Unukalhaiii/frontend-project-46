import * as fs from 'fs';
import * as path from 'path';
import buildDiff from './diffTree.js';
import formatTree from './formatters/index.js';
import parseData from './parsers.js';

export const getFormat = (filePath) => path.extname(filePath).slice(1);

export const getData = (file) => {
  const filePath = path.isAbsolute(file) ? file : path.resolve(process.cwd(), file);
  const fileContent = fs.readFileSync(`${filePath}`, 'utf8');
  const format = getFormat(filePath);
  const readData = parseData(fileContent, format);
  return readData;
};

const gendiff = (filepath1, filepath2, format = 'stylish') => {
  const data1 = getData(filepath1);
  const data2 = getData(filepath2);
  const diffTree = buildDiff(data1, data2);
  return formatTree(diffTree, format);
};

export default gendiff;
