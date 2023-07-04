#!/usr/bin/env node

import { Command } from "../node_modules/commander/esm.mjs";;
const program = new Command();

program
    .name('gendiff')
    .description('Compares two configuration files and shows a difference')
    .version('0.1.0');

program.command('gendiff')
    .description('Compares two configuration files and shows a difference')
    .option('-V', '--version', 'output the version number')
    .option('-h', '--help', 'output usage information');

program.parse();