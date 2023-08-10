import _ from 'lodash';

const valueToString = (value) => {
  if (value === null) {
    return null;
  }
  if (typeof value === 'object') {
    return '[complex value]';
  }
  if (typeof value === 'string') {
    return `'${value}'`;
  }
  return value;
};

const toPlain = (val) => {
  const iter = (currentValue, pathString = '', depth = 0) => {
    const lines = currentValue.map(({
      item, status, value, value2,
    }) => {
      const findStatus = (path) => {
        if (path !== '') {
          const arr = path.split('.');
          if (arr.length !== depth) {
            _.slice(arr, 0, arr.length - 1);
            return arr.join('.');
          }
        }
        return path;
      };
      const pathStatus = findStatus(pathString);
      const pathInString = pathStatus === '' ? item : `.${item}`;
      if (status === 'added') {
        return `Property '${pathStatus}${pathInString}' was added with value: ${valueToString(value)}`;
      }
      if (status === 'removed') {
        return `Property '${pathStatus}${pathInString}' was removed`;
      }
      if (status === 'updated') {
        return `Property '${pathStatus}${pathInString}' was updated. From ${valueToString(value)} to ${valueToString(value2)}`;
      }
      if (status === 'notChanged') {
        const pref = findStatus(pathString);
        const prefWithItem = `${pref}.${item}`;
        const newString = pref === '' ? item : prefWithItem;
        if (typeof value === 'object') {
          return iter(value, newString, depth + 1);
        }
        return '';
      }
      return ' ';
    });

    return [
      ...lines,
    ].filter(Boolean).join('\n').trim();
  };

  return iter(val);
};

export default toPlain;
