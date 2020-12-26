import { test, expect } from '@jest/globals';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const extention = ['json', 'yml'];
const checkResult = (resultName) => fs.readFileSync(path.resolve(__dirname, `./fixtures/${resultName}.diff`), 'utf8');

describe('gendiff', () => {
  describe.each(extention)('compare two %s files', (ext) => {
    const before = path.resolve(__dirname, `./fixtures/before.${ext}`);
    const after = path.resolve(__dirname, `./fixtures/after.${ext}`);
    const resultStylish = checkResult('result_stylish');
    const resultPlain = checkResult('result_plain');
    const resultJson = checkResult('result_json');

    test('stylish', () => {
      expect(genDiff(before, after)).toEqual(resultStylish);
    });

    test('plain', () => {
      expect(genDiff(before, after, 'plain')).toEqual(resultPlain);
    });

    test('json', () => {
      expect(genDiff(before, after, 'json')).toEqual(resultJson);
    });
  });
});
