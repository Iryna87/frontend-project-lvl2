import _ from 'lodash';

const isObject = (item) => {
  if (!_.isObject(item) && typeof item === 'string') {
    return `'${item}'`;
  } if (!_.isObject(item) && typeof item !== 'string') {
    return item;
  }
  return '[complex value]';
};

const mapping = {
  added: (item, name) => `Property '${name}' was added with value: ${isObject(item.value)}`,
  removed: (item, name) => `Property '${name}' was removed`,
  unchanged: () => '',
  changed: (item, name) => `Property '${name}' was updated. From ${isObject(item.value1)} to ${isObject(item.value2)}`,
  nested: (item, currentPath) => `${(_.compact(item.children.map((child) => {
    const result = `${mapping[child.status](child, `${currentPath}.${child.key}`)}`;
    return result;
  })).join('\n'))}`,
};

const makePlain = (diff) => {
  const results = diff.map((item) => mapping[item.status](item, item.key));
  return `${results.join('\n')}`;
};

export default makePlain;
