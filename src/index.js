import fs from 'fs';
import path from 'path';
import _ from 'lodash';

export default (filename1, filename2) => {
  const before = fs.readFileSync(path.resolve(filename1), 'utf-8');
  const after = fs.readFileSync(path.resolve(filename2), 'utf-8');
  const objFromFirstJson = JSON.parse(before);
  const objFromSecondJson = JSON.parse(after);
  const arrFromFirstObj = Object.entries(objFromFirstJson);
  const arrFromSecondObj = Object.entries(objFromSecondJson);
  const difference = {};
  // eslint-disable-next-line no-restricted-syntax
  for (const [key, value] of arrFromFirstObj) {
    if (!_.has(objFromSecondJson, key)) {
      difference[` - ${key}`] = value;
    } if (objFromFirstJson[key] !== objFromSecondJson[key]) {
      difference[` - ${key}`] = value;
    } else {
      difference[`   ${key}`] = value;
    }
  }
  // eslint-disable-next-line no-restricted-syntax
  for (const [key, value] of arrFromSecondObj) {
    if (!_.has(objFromFirstJson, key)) {
      difference[` + ${key}`] = value;
    } if (objFromFirstJson[key] !== objFromSecondJson[key]) {
      difference[` + ${key}`] = value;
    }
  }
  return difference;
};
