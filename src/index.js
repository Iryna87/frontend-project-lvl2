import fs from 'fs';
import path from 'path';
import _ from 'lodash';
import parse from './parsers.js';

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
  const [parseBefore, parseAfter] = getData(pathToFile1, pathToFile2);
  const getHiddenFilesCount = (node) => {
    console.log(node);
    console.log(_.isObject(node));
    if (!_.isObject(node)) {
      return Object.values(node);
    }
    const children = Object.keys(node);
    console.log(children);
    return children.map(getHiddenFilesCount);
  };
  return getHiddenFilesCount(parseBefore.common);
};

export default genDiff;
