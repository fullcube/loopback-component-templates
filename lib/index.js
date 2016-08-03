/* eslint filenames/match-regex: 0 */
'use strict'

const debug = require('debug')('loopback:component:templates')

module.exports = function loopbackComponentTemplates(app) {
  const modelNames = Object.keys(app.models)
  let count = 0

  modelNames.forEach(modelName => {
    const Model = app.models[modelName]

    if (typeof Model._templates !== 'function') {
      return
    }

    Object.keys(Model._templates()).forEach(templateName => {
      count++
      const fnName = `_template_${templateName}`
      const fnNameRemote = `_template_${templateName}_remote`
      const path = `/${fnName}`

      debug('Templates: Add remote method at model %s: %s', Model.modelName, fnName)

      // The normal method does not need to be wrapped in a promise
      Model[fnName] = options => {
        // Get the random data
        const template = Model._templates()[templateName]

        // Overwrite it with the passed in options
        return Object.assign(template, options)
      }

      Model.remoteMethod(fnNameRemote, {
        description: `Generate template ${templateName}`,
        isStatic: true,
        accepts: [ { type: 'Object', arg: 'options', description: 'Overwrite values of template' } ],
        returns: [ { type: 'Object', arg: 'result', root: true } ],
        http: { path, verb: 'get' },
      })

      // The remote method needs to be wrapped in a promise
      Model[fnNameRemote] = options => new Promise(resolve => resolve(Model[fnName](options)))
    })
  })

  debug(`Templates: ${count} templates loaded`)
}
