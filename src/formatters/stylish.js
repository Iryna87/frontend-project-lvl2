import _ from 'lodash';

const getIndent = (depth, spacersCount = 2) => ' '.repeat(depth * spacersCount);

const stringify = (item, mapping, depth) => {
  if (!_.isObject(item)) {
    return item;
  }
  const results = Object.entries(item)
    .map(([key, value]) => mapping.unchanged({ key, value }, depth + 2));
  return `{\n${results.join('\n')}\n${getIndent(depth + 1)}}`;
};

const mapping = {
  added: (item, depth) => `${getIndent(depth)}+ ${item.key}: ${stringify(item.value, mapping, depth)}`,
  removed: (item, depth) => `${getIndent(depth)}- ${item.key}: ${stringify(item.value, mapping, depth)}`,
  unchanged: (item, depth) => `${getIndent(depth)}  ${item.key}: ${stringify(item.value, mapping, depth)}`,
  changed: (item, depth) => [`${getIndent(depth)}- ${item.key}: ${stringify(item.value1, mapping, depth)}`,
    `${getIndent(depth)}+ ${item.key}: ${stringify(item.value2, mapping, depth)}`].join('\n'),
  nested: (item, depth) => {
    const result = item.children.map((child) => mapping[child.type](child, depth + 2));
    return `${getIndent(depth)}  ${item.key}: {\n${result.join('\n')}\n  ${getIndent(depth)}}`;
  },
};

const makeStylish = (diff) => {
  const results = diff.map((item) => mapping[item.type](item, 1));
  return `{\n${results.join('\n')}\n}`;
};

export default makeStylish;
