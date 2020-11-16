import { test, expect } from '@jest/globals';
import fs from 'fs';
import path from 'path';
import genDiff from '../src/index.js';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const jsonResult = fs.readFileSync(path.resolve(__dirname, './fixtures/result.json'), 'utf8');
const before = path.resolve(__dirname, './fixtures/before.json');
const after = path.resolve(__dirname, './fixtures/after.json');

test('genDiff', () => {
  expect(genDiff(before, after)).toBe(jsonResult);
});
