const fs = require('fs')

const chalk = require('chalk')

const func = () => {
  process.stdout.write(
    chalk.white.bold('Creating default config file: ') +
      chalk.yellow('In progess'),
  )
  fs.writeFileSync(
    '.staticejsrc',
    JSON.stringify({
      pages: 'src/',
      output: 'build/',
    }),
  )
  process.stdout.clearLine()
  process.stdout.cursorTo(0)
  console.log(
    chalk.white.bold('Creating default config file: ') + chalk.green('Done'),
  )
  console.log(
    '.staticejs holds the information on which the files will be built',
  )
}

module.exports = func
