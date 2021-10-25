const chalk = require('chalk')

class waitingText {
  symbols = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏']
  done = ['✓', '✗']
  constructor(text, interval = 80) {
    this.text = text
    this.interval = interval
  }
  start = () => {
    this.index = 0
    this.runner = setInterval(() => {
      process.stdout.clearLine()
      process.stdout.cursorTo(0)
      process.stdout.write(
        chalk.blue(this.symbols[this.index]) + ' ' + this.text,
      )
      this.index = (this.index + 1) % this.symbols.length
    }, this.interval)
  }
  stop = (status = true) => {
    clearInterval(this.runner)
    process.stdout.clearLine()
    process.stdout.cursorTo(0)
    if (status == true) {
      console.log(chalk.green(this.done[0]) + ' ' + this.text)
    } else {
      console.log(chalk.red(this.done[1]) + ' ' + this.text)
    }
  }
}

module.exports = waitingText
