const chalk = require('chalk')
const fs = require('fs')
const path = require('path')
const waitingText = require('../lib/waitingText')
const ejs = require('ejs')
const lru = require('lru-cache')
ejs.cache = new lru(100)

const func = async () => {
  //Parsing the config file
  let file = undefined
  try {
    file = JSON.parse(fs.readFileSync('.staticejsrc'))
    console.log(chalk.green('✓ ') + 'Reading config file')
  } catch {
    console.log(chalk.red('✗ ') + 'Reading config file')
    try {
      fs.readFileSync('.staticejsrc')
      try {
        JSON.parse(fs.readFileSync('.staticejsrc'))
      } catch {
        console.log('└  ' + chalk.red.dim('Could not parse config file'))
      }
    } catch {
      console.log('└  ' + chalk.red.dim('Could not read config file'))
    }
    return
  }

  const buildText = new waitingText('Building your files')
  buildText.start()
  const filedirectory = file.pages ?? 'src/'
  const builddirectory = file.output ?? 'build/'

  let files
  try {
    files = fs.readdirSync(filedirectory)
  } catch {
    buildText.stop(false)
    console.log('└  ' + chalk.red.dim('Could not find page directory'))
    return
  }

  try {
    fs.mkdirSync(builddirectory)
  } catch {}

  files.forEach((file) => {
    const stat = fs.statSync(filedirectory + file)
    if (stat.isDirectory()) return
    if (path.extname(file) != '.ejs') return

    let html
    try {
      html = ejs.compile(fs.readFileSync(filedirectory + file, 'utf-8'), {
        async: false,
        filename: file,
      })
    } catch (ex) {
      console.log(ex)
      console.log('failed build file: ' + file)
      return
    }

    fs.writeFileSync(builddirectory + file.split('.')[0] + '.html', html())
  })
  buildText.stop()

  files.forEach((file) => {
    console.log('└  ' + file)
  })
}

module.exports = func
