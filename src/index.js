import fs from 'fs';
import path from 'path';
import _ from 'lodash';
import parse from './parsers.js';
import formatResult from './formatters/index.js';

const getFileData = (pathToFile) => {
  const dataContent = fs.readFileSync(path.resolve(pathToFile), 'utf-8');
  const dataFormat = path.extname(pathToFile).slice(1);
  return { dataContent, dataFormat };
};

const getParsedData = (pathToFile) => {
  const fileData = getFileData(pathToFile);
  const parsedData = parse(fileData.dataFormat, fileData.dataContent);
  return parsedData;
};

const buildDifferenceTree = (firstObj, secondObj, depthForSpaces = 1) => {
  const children = _.sortBy(_.union(_.keys(firstObj), _.keys(secondObj)));
  return children.flatMap((child) => {
    if (_.isEqual(firstObj[child], secondObj[child])) {
      return {
        key: child, value: firstObj[child], status: 'unchanged', depth: depthForSpaces,
      };
    } if (!_.has(firstObj, child)) {
      return {
        key: child, value: secondObj[child], status: 'added', depth: depthForSpaces,
      };
    } if (!_.has(secondObj, child)) {
      return {
        key: child, value: firstObj[child], status: 'removed', depth: depthForSpaces,
      };
    } if (_.isObject(firstObj[child]) && _.isObject(secondObj[child])) {
      return {
        key: child, children: buildDifferenceTree(firstObj[child], secondObj[child], depthForSpaces + 2), status: 'nested', depth: depthForSpaces,
      };
    }
    return {
      key: child, value1: firstObj[child], value2: secondObj[child], status: 'changed', depth: depthForSpaces,
    };
  });
};

const genDiff = (pathToFile1, pathToFile2, format = 'stylish') => {
  const firstDataToCompare = getParsedData(pathToFile1);
  const secondDataToCompare = getParsedData(pathToFile2);
  const result = buildDifferenceTree(firstDataToCompare, secondDataToCompare);
  return formatResult(result, format);
};

export default genDiff;
