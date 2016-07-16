'use strict'

const createPromiseCallback = require('loopback-datasource-juggler/lib/utils').createPromiseCallback
const debug = require('debug')('loopback:component:templates')

module.exports = function TemplatesFn(Model) {
  debug('Templates: %s: Initializing ', Model.modelName)

  if (typeof Model._templates !== 'function') {
    debug('Templates: %s: Function not found: %s', Model.modelName, '_templates')
    return
  }

  Object.keys(Model._templates()).forEach(templateName => {
    const fnName = `_template_${templateName}`

    debug('Templates: %s: Add remote method for template: %s', Model.modelName, templateName)
    Model.remoteMethod(fnName, {
      description: `Generate template ${templateName}`,
      isStatic: true,
      accepts: [ { type: 'Object', arg: 'options', description: 'Overwrite values of template' } ],
      returns: [ { type: 'Object', arg: 'result', root: true } ],
      http: { path: `/_template/${templateName}`, verb: 'get' },
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

}
