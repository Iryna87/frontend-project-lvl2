#!/usr/bin/env node

import pkg from 'commander';
import genDiff from '../src/index.js';

const { Command } = pkg;
const program = new Command();

program
  .version('0.0.1')
  .arguments('<cmd> [env]')
  .description('Compares two configuration files and shows a difference')
  .option('-f, --format [type]', 'output format: stylish, plain, json', 'stylish')
  .action((filepath1, filepath2) => {
    const diff = genDiff(filepath1, filepath2, program.format);
    console.log(diff);
  });

program.on('--help', () => {
  console.log('');
  console.log('Example call:');
  console.log('  $ custom-help --help');
});

program.parse(process.argv);
