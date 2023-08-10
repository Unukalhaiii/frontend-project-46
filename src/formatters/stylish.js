const toStylish = (val, replacer = ' ', spacesCount = 1) => {
  const iter = (currentValue, depth) => {
    if (typeof currentValue !== 'object') {
      return currentValue === undefined ? 'undefined' : currentValue.toString();
    }
    if (currentValue === null) {
      return 'null';
    }

    const indentSize = depth * spacesCount;
    const currentIndent = replacer.repeat(indentSize);
    const bracketIndent = replacer.repeat(indentSize - spacesCount);
    const actualIndent = currentIndent === undefined ? '' : currentIndent;
    const lines = currentValue.map(({
      item, status, value, value2,
    }) => {
      const findStatus = (it) => {
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
      if (value2 !== undefined) {
        return `${actualIndent}${findStatus(status)[0]}${item}: ${iter(value, depth + 2)}\n${actualIndent}${findStatus(status)[1]}${item}: ${iter(value2, depth + 2)}`;
      }
      if (typeof value === 'object') {
        return `${actualIndent}${findStatus(status)}${item}: ${iter(value, depth + 2)}`;
      }
      const val1 = typeof value === 'object' ? value : iter(value, depth + 2);
      return `${actualIndent}${findStatus(status)}${item}: ${val1}`;
    });
    return [
      '{',
      ...lines,
      `${bracketIndent}}`,
    ].join('\n');
  };

  return iter(val, 1);
};

export default toStylish;
