#! /usr/bin/env node
const { Command } = require('commander')
const init = require('./init')
const build = require('./build')
const dev = require('./dev')

const program = new Command()
program.version('0.0.1')

program.command('init').description('create config file').action(init)

program.command('dev').description('starts a dev server').action(dev)

program
  .command('build')
  .description('builds all of the ejs files')
  .action(build)

program.parse()
