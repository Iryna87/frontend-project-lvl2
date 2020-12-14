import _ from 'lodash';

const getIndent = (depth, spacersCount = 2) => ' '.repeat(depth * spacersCount);

const stringify = (item, mapping, depth) => {
  if (!_.isObject(item)) {
    return item;
  }
  const results = Object.entries(item)
    .map(([key, value]) => mapping.unchanged({ key, value, depth: depth + 2 }));
  return `{\n${results.join('\n')}\n${getIndent(depth + 1)}}`;
};

const mapping = {
  added: (item) => `${getIndent(item.depth)}+ ${item.key}: ${stringify(item.value, mapping, item.depth)}`,
  removed: (item) => `${getIndent(item.depth)}- ${item.key}: ${stringify(item.value, mapping, item.depth)}`,
  unchanged: (item) => `${getIndent(item.depth)}  ${item.key}: ${stringify(item.value, mapping, item.depth)}`,
  changed: (item) => `${getIndent(item.depth)}- ${item.key}: ${stringify(item.value1, mapping, item.depth)}\n${getIndent(item.depth)}+ ${item.key}: ${stringify(item.value2, mapping, item.depth)}`,
  nested: (item) => `${getIndent(item.depth)}  ${item.key}: {\n${(item.children.map((child) => {
    const result = mapping[child.status](child);
    return result;
  }).join('\n'))}\n${getIndent(item.depth + 1)}}`,
};

const makeStylish = (diff) => {
  const results = diff.map((item) => mapping[item.status](item));
  return `{\n${results.join('\n')}\n}`;
};

export default makeStylish;
