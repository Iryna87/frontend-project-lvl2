import _ from 'lodash';

const stringify = (item) => {
  if (item !== null && _.isObject(item)) {
    return '[complex value]';
  } if (typeof item === 'string') {
    return `'${item}'`;
  }
  return item;
};
const generatePath = (args) => {
  const flatten = args.flat(Infinity);
  const result = flatten.flatMap((el) => el.trim());
  return result.join('.');
};

const mapping = {
  added: (item, ...name) => `Property '${generatePath(name)}' was added with value: ${stringify(item.value)}`,
  removed: (item, ...name) => `Property '${generatePath(name)}' was removed`,
  unchanged: () => '',
  changed: (item, ...name) => `Property '${generatePath(name)}' was updated. From ${stringify(item.value1)} to ${stringify(item.value2)}`,
  nested: (item, ...name) => {
    const result = item.children.map((child) => `${mapping[child.type](child, name, child.key)}`);
    return `${_.compact(result).join('\n')}`;
  },
};

const makePlain = (diff) => {
  const results = diff.map((item) => mapping[item.type](item, item.key));
  return `${results.join('\n')}`;
};

export default makePlain;
