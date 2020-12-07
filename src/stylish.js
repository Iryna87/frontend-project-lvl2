const mapping = {
  added: (item) => `      + ${item.key}: ${item.value}`,
  removed: (item) => `      - ${item.key}: ${item.value}`,
  unchanged: (item) => `        ${item.key}: ${item.value}`,
  changed: (item) => `      - ${item.key}: ${item.value1} /n      + ${item.key}: ${item.value2}`,
  nested: (item, stylish) => `    ${item.key}: ${stylish(item.children)}`,
};

const stylish = (diff) => {
  const results = diff.map((item) => mapping[item.status](item, stylish));
  return `{\n${results.join('\n')}\n}`;
};

export default stylish;
