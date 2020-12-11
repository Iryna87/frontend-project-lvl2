import formatStylish from './stylish.js';
import formatPlain from './plain.js';

const formatters = {
  stylish: formatStylish,
  plain: formatPlain,
};

export default (ast, type) => {
  if (type.format !== 'plain' && type.format !== 'stylish') {
    throw new Error('The format is not supported!');
  }
  const format = formatters[type.format];
  return format(ast);
};
