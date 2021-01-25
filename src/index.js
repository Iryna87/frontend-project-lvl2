import fs from 'fs';
import path from 'path';
import buildDifference from './ast.js';
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

const genDiff = (pathToFile1, pathToFile2, format = 'stylish') => {
  const firstDataToCompare = getParsedData(pathToFile1);
  const secondDataToCompare = getParsedData(pathToFile2);
  const result = buildDifference(firstDataToCompare, secondDataToCompare);
  return formatResult(result, format);
};

export default genDiff;
