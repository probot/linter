const standard = require('standard')

module.exports = {
  async push (context) {
    let whiteList
    const linterItems = {}
    const push = context.payload

    const compare = await context.github.repos.compareCommits(context.repo({
      base: push.before,
      head: push.after
    }))

    const branch = push.ref.replace('refs/heads/', '');
    const branch = 'refs/heads/revert-28-hiimbex-patch-11'
    // Checks for a config file
    let config = context.config('linter.yml')
    // Adds properties to a LinterItem object to be passed to standard.lintText()
    if (config) {
      for (const property in config) {
        if (property === 'whiteList') {
          whiteList = config[property]
        } else {
          linterItems[property] = config[property]
        }
      }
    }

    return Promise.all(compare.data.files.map(async file => {
      if (!whiteList.includes(file.filename)) {
        const content = await context.github.repos.getContent(context.repo({
          path: file.filename,
          ref: branch
        }))
        const text = Buffer.from(content.data.content, 'base64').toString()
        Object.assign(linterItems, {cwd: '', fix: true, filename: file.filename})

        standard.lintText(text, linterItems, (err, results) => {
          if (err) {
            throw new Error(err)
          }
          return Promise.all(results.results.map(result => {
            if (result.output) {
              // Checks that we have a fixed version and the file isn't part of the whiteList
              context.github.repos.updateFile(context.repo({
                path: file.filename,
                message: `Fix lint errors for ${file.filename}`,
                content: Buffer.from(result.output).toString('base64'),
                sha: content.data.sha,
                branch
              }))
            }
          }))
        })
      }
    }))
  }
}
