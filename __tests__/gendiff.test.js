import { test, expect } from '@jest/globals';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const extention = ['json', 'yml'];

describe('gendiff', () => {
  const resultStylish = fs.readFileSync(path.resolve(__dirname, './fixtures/result_stylish.diff'), 'utf8');
  const resultPlain = fs.readFileSync(path.resolve(__dirname, './fixtures/result_plain.diff'), 'utf8');
  const resultJson = fs.readFileSync(path.resolve(__dirname, './fixtures/result_json.diff'), 'utf8');

  describe.each(extention)('compare two %s files', (ext) => {
    const before = path.resolve(__dirname, `./fixtures/before.${ext}`);
    const after = path.resolve(__dirname, `./fixtures/after.${ext}`);
    const expected1 = genDiff(before, after);
    const expected2 = genDiff(before, after, 'plain');
    const expected3 = genDiff(before, after, 'json');

    test('stylish', () => {
      expect(expected1).toEqual(resultStylish);
    });

    test('plain', () => {
      expect(expected2).toEqual(resultPlain);
    });

    test('json', () => {
      expect(expected3).toEqual(resultJson);
    });
  });
});
