import _ from 'lodash';

const buildDiff = (data1, data2) => {
  const keys = _.union(Object.keys(data1), Object.keys(data2));
  const sortedKeys = _.sortBy(keys);
  const diff = sortedKeys.map((key) => {
    if (_.isPlainObject(data1[key]) && _.isPlainObject(data2[key])) {
      return { property: key, type: 'nested', children: buildDiff(data1[key], data2[key]) };
    }
    if (!_.has(data2, key)) {
      return { property: key, type: 'deleted', value: data1[key] };
    }
    if (!_.has(data1, key)) {
      return { property: key, type: 'added', value: data2[key] };
    }
    if (_.has(data1, key) && _.has(data2, key) && data1[key] !== data2[key]) {
      return {
        property: key, type: 'changed', oldValue: data1[key], newValue: data2[key],
      };
    }
    return { property: key, type: 'unchanged', value: data1[key] };
  });
  return diff;
};

export default (data1, data2) => ({
  type: 'root',
  children: buildDiff(data1, data2),
});
