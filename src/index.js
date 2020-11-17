import fs from 'fs';
import path from 'path';

export default (filename1, filename2) => {
  const before = fs.readFileSync(path.resolve(filename1), 'utf-8');
  const after = fs.readFileSync(path.resolve(filename2), 'utf-8');
  const objFromFirstJson = JSON.parse(before);
  const objFromSecondJson = JSON.parse(after);
  const arrFromFirstObj = Object.keys(objFromFirstJson);
  const arrFromSecondObj = Object.keys(objFromSecondJson);
  const difference = {};
  arrFromFirstObj.map((i) => {
    if (arrFromSecondObj.includes(i) && objFromFirstJson[i] !== objFromSecondJson[i]) {
      difference[` - ${i}`] = objFromFirstJson[i];
      difference[` + ${i}`] = objFromSecondJson[i];
    } if (arrFromSecondObj.includes(i) && objFromFirstJson[i] === objFromSecondJson[i]) {
      difference[`   ${i}`] = objFromSecondJson[i];
    } if (!arrFromSecondObj.includes(i)) {
      difference[` - ${i}`] = objFromFirstJson[i];
    }
    return difference;
  });
  arrFromSecondObj.map((i) => {
    if (!arrFromFirstObj.includes(i)) {
      difference[` + ${i}`] = objFromSecondJson[i];
    }
    return difference;
  });
  return JSON.stringify(difference);
};
