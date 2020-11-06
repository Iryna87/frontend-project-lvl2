#!/usr/bin/env node

import pkg from 'commander';
const { Command } = pkg;
const program = new Command();

program
  .option('-f, --foo', 'enable some foo');

// must be before .parse()
program.on('--help', () => {
  console.log('');
  console.log('Example call:');
  console.log('  $ custom-help --help');
});

program.parse(process.argv);
