import fs from 'fs';
import path from 'path';
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
  const arrFromFirstObj = Object.keys(parseBefore);
  const arrFromSecondObj = Object.keys(parseAfter);
  const difference = {};
  arrFromFirstObj.map((i) => {
    if (arrFromSecondObj.includes(i) && parseBefore[i] !== parseAfter[i]) {
      difference[` - ${i}`] = parseBefore[i];
      difference[` + ${i}`] = parseAfter[i];
    } if (arrFromSecondObj.includes(i) && parseBefore[i] === parseAfter[i]) {
      difference[`   ${i}`] = parseAfter[i];
    } if (!arrFromSecondObj.includes(i)) {
      difference[` - ${i}`] = parseBefore[i];
    }
    return difference;
  });
  arrFromSecondObj.map((i) => {
    if (!arrFromFirstObj.includes(i)) {
      difference[` + ${i}`] = parseAfter[i];
    }
    return difference;
  });
  return JSON.stringify(difference);
};

export default genDiff;
