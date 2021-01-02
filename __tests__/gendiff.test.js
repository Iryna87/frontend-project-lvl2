import { test, expect } from '@jest/globals';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const extentions = ['json', 'yml'];
const getResult = (resultName) => fs.readFileSync(path.resolve(__dirname, 'fixtures', `${resultName}.diff`), 'utf8');

describe('gendiff', () => {
  describe.each(extentions)('compare two %s files', (ext) => {
    const firstFile = path.resolve(__dirname, 'fixtures', `before.${ext}`);
    const secondFile = path.resolve(__dirname, 'fixtures', `after.${ext}`);

    test('stylish', () => {
      expect(genDiff(firstFile, secondFile)).toEqual(getResult('resultStylish'));
    });

    test('plain', () => {
      expect(genDiff(firstFile, secondFile, 'plain')).toEqual(getResult('resultPlain'));
    });

    test('json', () => {
      expect(genDiff(firstFile, secondFile, 'json')).toEqual(getResult('resultJson'));
    });
  });
});
