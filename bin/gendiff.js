#!/usr/bin/env node
/* eslint-disable import/no-extraneous-dependencies */

import pkg from 'commander';

const { Command } = pkg;
const program = new Command();

program
  .version('0.0.1')
  .arguments('<cmd> [env]')
  .description('Compares two configuration files and shows a difference')
  .option('-f, --format [type]', 'output format: json, plain, tree', 'tree');

// must be before .parse()
program.on('--help', () => {
  console.log('');
  console.log('Example call:');
  console.log('  $ custom-help --help');
});

program.parse(process.argv);
