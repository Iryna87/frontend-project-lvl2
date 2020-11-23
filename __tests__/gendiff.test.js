import { test, expect } from '@jest/globals';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const extention = ['json', 'yml'];

describe('gendiff', () => {
  const ymlResult = fs.readFileSync(path.resolve(__dirname, './fixtures/result.yml'), 'utf8');
  const jsonResult = fs.readFileSync(path.resolve(__dirname, './fixtures/result.json'), 'utf8');

  describe.each(extention)('compare two %s files', (ext) => {
    const before = path.resolve(__dirname, `./fixtures/before.${ext}`);
    const after = path.resolve(__dirname, `./fixtures/after.${ext}`);
    const expected = genDiff(before, after);

    test('yml', () => {
      expect(expected).toEqual(ymlResult);
    });

    test('json', () => {
      expect(genDiff(before, after)).toEqual(jsonResult);
    });
  });
});
