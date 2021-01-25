import yaml from 'js-yaml';

const parsers = {
  json: JSON.parse,
  yml: yaml.safeLoad,
};

export default (format, content) => parsers[format](content);
