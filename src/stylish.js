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
  nested: (item, stylish) => `${getIndent(item.depth)}  ${item.key}: ${stylish(item.children)}`,
};

const stylish = (diff) => {
  const iter = (items, depth) => {
    const results = items.map((item) => {
      if (item.status === 'nested') {
        const children = [item.children];
        const answers = children.map((child) => `${item.key}: ${iter(child)}\n${getIndent(depth + 0.5)}}`);
        return ` ${getIndent(item.depth)} ${answers}`;
      }
      return mapping[item.status](item);
    });
    return `{\n${results.join('\n')}\n}`;
  };
  return iter(diff, 1);
};

export default stylish;
