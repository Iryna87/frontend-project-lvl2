import _ from 'lodash';

const getIndent = (depth, spacersCount = 4) => ' '.repeat(depth * spacersCount);

const stringify = (item, mapping, depth) => {
  if (!_.isObject(item)) {
    return item;
  }
  const results = Object.entries(item)
    .map(([key, value]) => mapping.unchanged({ key, value, depth: item.depth + 1 }));
  return `{\n${results.join('\n')}\n}`;
};

const mapping = {
  added: (item) => `${getIndent(item.depth)}+ ${item.key}: ${stringify(item.value, mapping, depth)}`,
  removed: (item) => `${getIndent(item.depth)}- ${item.key}: ${stringify(item.value, mapping, depth)}`,
  unchanged: (item) => `${getIndent(item.depth)} ${item.key}: ${stringify(item.value, mapping, depth)}`,
  changed: (item) => `${getIndent(item.depth)}- ${item.key}: ${stringify(item.value1, mapping, depth)}\n${getIndent(item.depth)}+ ${item.key}: ${stringify(item.value2, mapping, depth)}`,
  nested: (item, stylish) => `${getIndent(item.depth)} ${item.key}: ${stylish(item.children, mapping)}${getIndent(item.depth)}`,
};

const stylish = (diff) => {
  const results = diff.map((item) => mapping[item.status](item, stylish));
  return `{\n${results.join('\n')}\n}`;
};

export default stylish;
