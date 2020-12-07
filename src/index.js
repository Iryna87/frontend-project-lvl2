import fs from 'fs';
import path from 'path';
import _ from 'lodash';
import parse from './parsers.js';
import stylish from './stylish.js';

const makeFileData = (pathToFile) => {
  const content = fs.readFileSync(path.resolve(pathToFile), 'utf-8');
  const format = path.extname(pathToFile).slice(1);
  return { content, format };
};

const getData = (pathToFile1, pathToFile2) => {
  const beforeConfig = makeFileData(pathToFile1);
  const afterConfig = makeFileData(pathToFile2);
  const parseBefore = parse(beforeConfig.format, beforeConfig.content);
  const parseAfter = parse(afterConfig.format, afterConfig.content);
  return [parseBefore, parseAfter];
};

const genDiff = (pathToFile1, pathToFile2) => {
  const [obj1, obj2] = getData(pathToFile1, pathToFile2);
  const compare = (parseBefore, parseAfter, depth) => {
    const children = _.union(_.keys(parseBefore), _.keys(parseAfter));
    return children.flatMap((child) => {
      if (_.isEqual(parseBefore[child], parseAfter[child])) {
        return {
          key: child, value: parseBefore[child], status: 'unchanged', depth: 1,
        };
      } if (!_.has(parseBefore, child)) {
        return {
          key: child, value: parseAfter[child], status: 'added', depth: 1,
        };
      } if (!_.has(parseAfter, child)) {
        return {
          key: child, value: parseBefore[child], status: 'removed', depth: 1,
        };
      } if (_.isObject(parseBefore[child]) && _.isObject(parseAfter[child])) {
        return { key: child, children: compare(parseBefore[child], parseAfter[child], depth + 1), status: 'nested' };
      }
      return {
        key: child, value1: parseBefore[child], value2: parseAfter[child], status: 'changed', depth: 1,
      };
    });
  };
  const result = compare(obj1, obj2, 1);
  return stylish(result);
};

export default genDiff;
