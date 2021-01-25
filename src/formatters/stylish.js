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
  changed: (item, depth) => `${getIndent(depth)}- ${item.key}: ${stringify(item.value1, mapping, depth)}\n${getIndent(depth)}+ ${item.key}: ${stringify(item.value2, mapping, depth)}`,
  nested: (item, depth) => `${getIndent(depth)}  ${item.key}: {\n${(item.children.map((child) => {
    const result = mapping[child.status](child, depth + 2);
    return result;
  }).join('\n'))}\n${getIndent(depth + 1)}}`,
};

const makeStylish = (diff) => {
  const results = diff.map((item) => mapping[item.status](item, 1));
  return `{\n${results.join('\n')}\n}`;
};

export default makeStylish;
