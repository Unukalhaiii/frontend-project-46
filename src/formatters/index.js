import toStylish from './stylish.js';
import toPlain from './plain.js';
import toJson from './json.js';

const convertData = (base, name) => {
  const spacesCount = 2;
  switch (name) {
    case 'plain':
      return toPlain(base);
    case 'json':
      return toJson(base);
    default:
      return toStylish(base, ' ', spacesCount);
  }
};

export default convertData;
