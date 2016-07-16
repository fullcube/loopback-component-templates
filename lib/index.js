/* eslint filenames/match-regex: 0 */
'use strict'

const debug = require('debug')('loopback:component:templates')
const createPromiseCallback = require('loopback-datasource-juggler/lib/utils').createPromiseCallback

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
      const path = `/${fnName}`

      debug('Templates: Add remote method at model %s: %s', Model.modelName, fnName)
      Model.remoteMethod(fnName, {
        description: `Generate template ${templateName}`,
        isStatic: true,
        accepts: [ { type: 'Object', arg: 'options', description: 'Overwrite values of template' } ],
        returns: [ { type: 'Object', arg: 'result', root: true } ],
        http: { path, verb: 'get' },
      })

      Model[fnName] = (options, cb) => {
        cb = cb || createPromiseCallback()
        // Get the random data
        const template = Model._templates()[templateName]
        // Overwrite it with the passed in options
        const result = Object.assign(template, options)

        process.nextTick(() => cb(null, result))
        return cb.promise
      }
    })
  })

  debug(`Templates: ${count} templates loaded`)
}
