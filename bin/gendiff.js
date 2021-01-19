#!/usr/bin/env node

import pkg from 'commander';
import genDiff from '../src/index.js';

const { Command } = pkg;
const program = new Command();

program
  .version('1.0.0')
  .arguments('<cmd> [env]')
  .description('Compares two configuration files and shows a difference')
  .option('-f, --format [type]', 'output format: stylish, plain, json', 'stylish')
  .action((filepath1, filepath2) => (
    console.log(genDiff(filepath1, filepath2, program.format))))
  .parse(process.argv);
