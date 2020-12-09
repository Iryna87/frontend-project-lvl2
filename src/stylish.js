import _ from 'lodash';

const getIndent = (depth, spacersCount = 4) => ' '.repeat(depth * spacersCount);

const stringify = (item, mapping, depth) => {
  if (!_.isObject(item)) {
    return item;
  }
  const results = Object.entries(item)
    .map(([key, value]) => mapping.unchanged({ key, value, depth: depth + 1 }));
  return `{\n${results.join('\n')}\n${getIndent(depth + 0.5)}}`;
};

const mapping = {
  added: (item) => `${getIndent(item.depth)}+ ${item.key}: ${stringify(item.value, mapping, item.depth)}`,
  removed: (item) => `${getIndent(item.depth)}- ${item.key}: ${stringify(item.value, mapping, item.depth)}`,
  unchanged: (item) => `${getIndent(item.depth)}  ${item.key}: ${stringify(item.value, mapping, item.depth)}`,
  changed: (item) => `${getIndent(item.depth)}- ${item.key}: ${stringify(item.value1, mapping, item.depth)}\n${getIndent(item.depth)}+ ${item.key}: ${stringify(item.value2, mapping, item.depth)}`,
  nested: (item) => `${getIndent(item.depth)}  ${item.key}: {\n${(item.children.map((child) => mapping[child.status](child)).join('\n'))}\n${getIndent(item.depth + 0.5)}}`,
};

const stylish = (diff) => {
  const results = diff.map((item) => mapping[item.status](item, stylish));
  return `{\n${results.join('\n')}\n}`;
};

export default stylish;
