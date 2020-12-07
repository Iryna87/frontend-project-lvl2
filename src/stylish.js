import _ from 'lodash';

const getIndent = (depth, spacersCount = 4) => ' '.repeat(depth * spacersCount);

const stringify = (item, mapping) => {
  if (!_.isObject(item)) {
    return value;
  }
  const results = Object.entries(item)
    .map(([key, value]) => mapping.unchanged({ key, value, depth: item.depth + 1 }));
  return `{\n${results.join('\n')}\n}`;
};

const mapping = {
  added: (item) => `${getIndent(item.depth)}+ ${item.key}: ${stringify(item.value, mapping)}`,
  removed: (item) => `${getIndent(item.depth)}- ${item.key}: ${stringify(item.value, mapping)}`,
  unchanged: (item) => `${getIndent(item.depth)} ${item.key}: ${stringify(item.value, mapping)}`,
  changed: (item) => `${getIndent(item.depth)}- ${item.key}: ${stringify(item.value1, mapping)}\n${getIndent(item.depth)}+ ${item.key}: ${stringify(item.value2, mapping)}`,
  nested: (item, stylish) => `${getIndent(item.depth)} ${item.key}: ${stylish(item.children, mapping)}${getIndent(item.depth)}`,
};

const stylish = (diff) => {
  const results = diff.map((item) => mapping[item.status](item, stylish));
  return `{\n${results.join('\n')}\n}`;
};

export default stylish;
