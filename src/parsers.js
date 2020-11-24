import yaml from 'js-yaml';

const parsers = {
  json: JSON.parse,
  yml: yaml.safeLoad,
};

export default (format, content) => {
  const parse = parsers[format];
  return parse(content);
};
