import _ from 'lodash';

const stringify = (item) => {
  if (item !== null && _.isObject(item)) {
    return '[complex value]';
  } if (typeof item === 'string') {
    return `'${item}'`;
  }
  return item;
};
const generatePath = (childPath, parentPath) => [...parentPath, childPath].join('.');

const mapping = {
  added: (item, path) => `Property '${generatePath(item.key, path)}' was added with value: ${stringify(item.value)}`,
  removed: (item, path) => `Property '${generatePath(item.key, path)}' was removed`,
  unchanged: () => '',
  changed: (item, path) => `Property '${generatePath(item.key, path)}' was updated. From ${stringify(item.value1)} to ${stringify(item.value2)}`,
  nested: (item, path) => {
    const result = item.children.map((child) => `${mapping[child.type](child, [...path, item.key])}`);
    return `${_.compact(result).join('\n')}`;
  },
};

const makePlain = (diff) => {
  const results = diff.map((item) => mapping[item.type](item, []));
  return `${results.join('\n')}`;
};

export default makePlain;
