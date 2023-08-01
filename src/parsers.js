import * as yaml from 'js-yaml';

const parseDoc = (file, format) => {
  if (format === 'yml' || format === 'yaml') {
    return yaml.load(file);
  }
  return JSON.parse(file);
};

export default parseDoc;
