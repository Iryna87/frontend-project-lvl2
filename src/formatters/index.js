import makeStylish from './stylish.js';
import makePlain from './plain.js';
import makeJson from './json.js';

const formatters = {
  stylish: makeStylish,
  plain: makePlain,
  json: makeJson,
};

export default (ast, type = 'stylish') => {
  if (type !== 'plain' && type !== 'json' && type !== 'stylish') {
    throw new Error('The format is not supported!');
  }
  return formatters[type](ast);
};
