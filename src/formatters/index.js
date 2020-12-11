import formatStylish from './stylish.js';
import formatPlain from './plain.js';

const formatters = {
  stylish: formatStylish,
  plain: formatPlain,
};

export default (ast, type = 'stylish') => {
  if (type !== 'plain' && type !== 'stylish') {
    throw new Error('The format is not supported!');
  }
  const format = formatters[type];
  return format(ast);
};
