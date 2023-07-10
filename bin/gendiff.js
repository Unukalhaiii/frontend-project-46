#!/usr/bin/env node

import { Command } from 'commander/esm.mjs';
import gendiff from '../src/functions.js';

const program = new Command();

program
  .description('Compares two configuration files and shows a difference')
  .version('0.1.0', '-V, --version', 'output the version number')
  .arguments('<filepath1> <filepath2>')
  .option('-f, --format [type]', 'output format', 'json', 'json')
  .action((filepath1, filepath2) => {
    console.log(gendiff(filepath1, filepath2));
  });

program.parse();
