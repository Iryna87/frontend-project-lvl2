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
  const compare = (parseBefore, parseAfter) => {
    const children = _.union(_.keys(parseBefore), _.keys(parseAfter));
    return children.flatMap((child) => {
      if (_.isEqual(parseBefore[child], parseAfter[child])) {
        const obj3 = { key: child, value: parseBefore[child], status: 'not modified' };
        return obj3;
      } if (!_.has(parseBefore, child)) {
        const obj4 = { key: child, value: parseAfter[child], status: 'added' };
        return obj4;
      } if (!_.has(parseAfter, child)) {
        const obj5 = { key: child, value: parseBefore[child], status: 'removed' };
        return obj5;
      } if (_.isObject(parseBefore[child]) && _.isObject(parseAfter[child])) {
        const obj6 = { key: child, children: compare(parseBefore[child], parseAfter[child]) };
        return obj6;
      }
      const obj7 = { key: child, value: parseBefore[child], status: 'removed' };
      const obj8 = { key: child, value: parseAfter[child], status: 'added' };
      return [obj7, obj8];
    });
  };
  const result = compare(obj1, obj2);
  return stylish(result);
};

export default genDiff;
