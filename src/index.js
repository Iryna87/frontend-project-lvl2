import fs from 'fs';
import path from 'path';
import buildAst from './ast.js';
import parseData from './parsers.js';
import formatResult from './formatters/index.js';

const getFileData = (pathToFile) => {
  const dataContent = fs.readFileSync(path.resolve(pathToFile), 'utf-8');
  const dataFormat = path.extname(pathToFile).slice(1);
  return { dataContent, dataFormat };
};

const getParsedData = (pathToFile) => {
  const fileData = getFileData(pathToFile);
  const parsedData = parseData(fileData.dataFormat, fileData.dataContent);
  return parsedData;
};

const genDiff = (pathToFile1, pathToFile2, format = 'stylish') => {
  const firstDataToCompare = getParsedData(pathToFile1);
  const secondDataToCompare = getParsedData(pathToFile2);
  const result = buildAst(firstDataToCompare, secondDataToCompare);
  console.dir(result, { depth: null });
  return formatResult(result, format);
};

export default genDiff;
