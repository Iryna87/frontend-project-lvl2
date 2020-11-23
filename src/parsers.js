import yaml from 'js-yaml';

// Выбирается функция-парсер в зависимости от расширения файла
export default (type, data) => {
  let parse;
  if (type === '.json') {
    parse = JSON.parse(data);
  } else if (type === '.yml') {
    parse = yaml.safeLoad(data);
  }
  return parse;
};
