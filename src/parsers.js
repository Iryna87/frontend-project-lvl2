import yaml from 'js-yaml';

export default (format, content) => {
  let parse;
  if (format === 'json') {
    parse = JSON.parse(data);
  } else if (type === 'yml') {
    parse = yaml.safeLoad(data);
  }
  return parse;
};
