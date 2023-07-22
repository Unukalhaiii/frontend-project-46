const stylish = (val, replacer = ' ', spacesCount = 1) => {
  const iter = (currentValue, depth) => {
    if (typeof currentValue !== 'object') {
      if (currentValue === undefined) {
        return 'undefined';
      }
      return currentValue.toString();
    }
    if (currentValue === null) {
      return 'null';
    }

    const indentSize = depth * spacesCount;
    const currentIn = replacer.repeat(indentSize);
    const bracketIndent = replacer.repeat(indentSize - spacesCount);
    const currentIndent = currentIn === undefined ? '' : currentIn;
    const lines = currentValue.map(({
      item, prefix, value, value2,
    }) => {
      const findPrefix = (it) => {
        if (it === 'added') {
          return '+ ';
        }
        if (it === 'removed') {
          return '- ';
        }
        if (it === 'updated') {
          return ['- ', '+ '];
        }
        return '  ';
      };
      if (typeof value === 'object') {
        if (value2 !== undefined) {
          return `${currentIndent}${findPrefix(prefix)[0]}${item}: ${iter(value, depth + 2)}\n${currentIndent}${findPrefix(prefix)[1]}${item}: ${iter(value2, depth + 2)}`;
        }
        return `${currentIndent}${findPrefix(prefix)}${item}: ${iter(value, depth + 2)}`;
      }
      if (value2 !== undefined) {
        return `${currentIndent}${findPrefix(prefix)[0]}${item}: ${iter(value, depth + 2)}\n${currentIndent}${findPrefix(prefix)[1]}${item}: ${iter(value2, depth + 2)}`;
      }
      const val1 = typeof value === 'object' ? value : iter(value, depth + 2);
      return `${currentIndent}${findPrefix(prefix)}${item}: ${val1}`;
    });
    return [
      '{',
      ...lines,
      `${bracketIndent}}`,
    ].join('\n');
  };

  return iter(val, 1);
};

export default stylish;
