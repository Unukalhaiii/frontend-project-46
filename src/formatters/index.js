import stylish from './stylish.js';
import plain from './plain.js';
import json from './json.js';

const formatTree = (tree, name) => {
  const spacesCount = 2;
  switch (name) {
    case 'plain':
      return plain(tree).join('').trim();
    case 'json':
      return json(tree);
    default:
      return stylish(tree, spacesCount);
  }
};

export default formatTree;
