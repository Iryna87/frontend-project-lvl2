import _ from 'lodash';

const checkIfValueIsObject = (item) => {
  if (!_.isObject(item) && typeof item === 'string') {
    return `'${item}'`;
  } if (!_.isObject(item) && typeof item !== 'string') {
    return item;
  }
  return '[complex value]';
};

const mapping = {
  added: (item) => `Property '${item.key}' was added with value: ${checkIfValueIsObject(item.value)}`,
  removed: (item) => `Property '${item.key}' was removed`,
  unchanged: () => '',
  changed: (item) => `Property '${item.key}' was updated. From ${checkIfValueIsObject(item.value1)} to ${checkIfValueIsObject(item.value2)}`,
  nested: (item) => `${((item.children.map((child) => {
    child.key = `${item.key}.${child.key}`;
    const result = `${mapping[child.status](child)}`;
    return result;
  }).filter((e) => String(e).trim())).join('\n'))}`,
};

const plain = (diff) => {
  const results = diff.map((item) => mapping[item.status](item));
  return `${results.join('\n')}`;
};

export default plain;
