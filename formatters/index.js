import toStylish from './stylish.js';
import toPlain from './plain.js';
import toJson from './json.js';

const chooseFormat = (base, name) => {
  if (name === 'plain') {
    return toPlain(base);
  }
  if (name === 'json') {
    return toJson(base);
  }
  return toStylish(base, ' ', 2);
};

export default chooseFormat;
