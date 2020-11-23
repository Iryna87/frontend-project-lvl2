import yaml from 'js-yaml';

export default (format, content) => {
  let parse;
  if (format === 'json') {
    parse = JSON.parse(content);
  } else if (format === 'yml') {
    parse = yaml.safeLoad(content);
  }
  return parse;
};
