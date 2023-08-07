import * as fs from 'fs';
import * as path from 'path';
import parseData from './parsers.js';

export const getFormat = (filePath) => path.extname(filePath).slice(1);

export const takeObjectFromFile = (file) => {
  const filePath = path.isAbsolute(file) ? file : path.resolve(process.cwd(), file);
  const fileContent = fs.readFileSync(`${filePath}`, 'utf8');
  const format = getFormat(filePath);
  const readData = parseData(fileContent, format);
  return readData;
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
