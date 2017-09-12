const linter = require('./lib')

module.exports = robot => {
  robot.on('push', linter.push)
}
