import formatStylish from './stylish.js';

const formatters = {
  stylish: formatStylish,
};

export default (ast, type) => {
  const format = formatters[type];
  return format(ast);
};
