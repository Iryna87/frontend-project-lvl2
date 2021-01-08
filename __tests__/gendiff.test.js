import { test, expect } from '@jest/globals';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const extentions = ['json', 'yml'];
const getFixturedPath = (pathName) => path.resolve(__dirname, 'fixtures', pathName);
const readFileContent = (fileName) => fs.readFileSync(getFixturedPath(fileName), 'utf-8');

const resultStylish = readFileContent('resultStylish.diff');
const resultPlain = readFileContent('resultPlain.diff');
const resultJson = readFileContent('resultJson.diff');

describe('gendiff', () => {
  describe.each(extentions)('compare two %s files', (ext) => {
    const firstFile = getFixturedPath(`before.${ext}`);
    const secondFile = getFixturedPath(`after.${ext}`);

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
