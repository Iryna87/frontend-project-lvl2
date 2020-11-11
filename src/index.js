import fs from 'fs';
import path from 'path';

export default (filename1, filename2) => {
  const before = fs.readFileSync(path.resolve(filename1), 'utf-8');
  const after = fs.readFileSync(path.resolve(filename2), 'utf-8');
  console.log(before, after);
};
