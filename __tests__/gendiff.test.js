import { test, expect } from '@jest/globals';
import fs from 'fs';
import { dirname, path } from 'path';
import { fileURLToPath } from 'url';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const jsonResult = fs.readFileSync(path.resolve(__dirname, './fixtures/result.json'), 'utf8');
const before = path.resolve(__dirname, './fixtures/before.json');
const after = path.resolve(__dirname, './fixtures/after.json');

test('genDiff', () => {
  expect(genDiff(before, after)).toBe(jsonResult);
});
