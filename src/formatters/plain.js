import _ from 'lodash';

const stringify = (item) => {
  if (_.isObject(item)) {
    return '[complex value]';
  } if (typeof item === 'string') {
    return `'${item}'`;
  }
  return item;
};

const mapping = {
  added: (item, name) => `Property '${name}' was added with value: ${stringify(item.value)}`,
  removed: (item, name) => `Property '${name}' was removed`,
  unchanged: () => '',
  changed: (item, name) => `Property '${name}' was updated. From ${stringify(item.value1)} to ${stringify(item.value2)}`,
  nested: (item, currentPath) => {
    const generatePath = (path, key) => `${path}.${key}`;
    const result = item.children.map((child) => `${mapping[child.type](child, generatePath(currentPath, child.key))}`);
    return `${_.compact(result).join('\n')}`;
  },
};

const makePlain = (diff) => {
  const results = diff.map((item) => mapping[item.type](item, item.key));
  return `${results.join('\n')}`;
};

export default makePlain;
