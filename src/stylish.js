import _ from 'lodash';

const getIndent = (depth, spacersCount = 4) => ' '.repeat(depth * spacersCount);

const returnFullValue = (value) => {
  if (_.isObject(value)) {
    return JSON.stringify(value).replace(/"/g, '');
  }
  return value;
};

const mapping = {
  added: (item) => `${getIndent(item.depth)}+ ${item.key}: ${returnFullValue(item.value)}`,
  removed: (item) => `${getIndent(item.depth)}- ${item.key}: ${returnFullValue(item.value)}`,
  unchanged: (item) => `  ${getIndent(item.depth)}${item.key}: ${returnFullValue(item.value)}`,
  changed: (item) => `${getIndent(item.depth)}- ${item.key}: ${returnFullValue(item.value1)}\n${getIndent(item.depth)}+ ${item.key}: ${returnFullValue(item.value2)}`,
  nested: (item, stylish) => `  ${getIndent(item.depth)}${item.key}: ${stylish(item.children)}${getIndent(item.depth)}`,
};

const stylish = (diff) => {
  const results = diff.map((item) => mapping[item.status](item, stylish, getIndent));
  return `{\n${results.join('\n')}\n}`;
};

export default stylish;
