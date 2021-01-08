import { test, expect } from '@jest/globals';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const extentions = ['json', 'yml'];

const getFixturePath = (pathName) => fs.readFileSync(path.resolve(__dirname, 'fixtures', pathName, 'utf8'));
const getFileContent = (fileName, ext) => getFixturePath(`${fileName}.${ext}`);

describe('gendiff', () => {
  describe.each(extentions)('compare two %s files', (ext) => {
    const firstFile = getFileContent('before', ext);
    const secondFile = getFileContent('after', ext);
    const resultStylish = getFileContent('resultStylish', 'diff');
    const resultPlain = getFileContent('resultPlain', 'diff');
    const resultJson = getFileContent('resultJson', 'diff');

    test('stylish', () => {
      expect(genDiff(firstFile, secondFile)).toEqual(resultStylish);
    });

    test('plain', () => {
      expect(genDiff(firstFile, secondFile, 'plain')).toEqual(resultPlain);
    });

    test('json', () => {
      expect(genDiff(firstFile, secondFile, 'json')).toEqual(resultJson);
    });
  });
});
