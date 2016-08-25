/* eslint filenames/match-regex: 0 */
'use strict'

const _ = require('lodash')
const debug = require('debug')('loopback:component:templates')
const Promise = require('bluebird')

module.exports = function loopbackComponentTemplates(app, config) {
  config.acls = config.acls || []
  const modelNames = Object.keys(app.models)

  Promise.resolve(modelNames).mapSeries(modelName => {
    const Model = app.models[modelName]

    if (typeof Model._templates !== 'function') {
      return null
    }

    return Promise.resolve(Object.keys(Model._templates()))
      .map(templateName => {
        const fnName = `_template_${templateName}`
        const fnNameRemote = `_template_${templateName}_remote`
        const path = `/${fnName}`

        debug('Create remote method for %s.%s', Model.modelName, fnName)

        // The normal method does not need to be wrapped in a promise
        Model[fnName] = (options, params) => {
          // Get the random data
          const template = Model._templates(params)[templateName]

          // Overwrite the template with the passed in options
          _.forEach(options, (value, key) => {
            _.set(template, key, value)
          })

          return template
        }

        // Define the remote method on the model
        Model.remoteMethod(fnNameRemote, {
          description: `Generate template ${templateName}`,
          isStatic: true,
          accepts: [
            { type: 'Object', arg: 'options', description: 'Overwrite values of template' },
            { type: 'Object', arg: 'params', description: 'Pass parameters into the template method' },
          ],
          returns: [ { type: 'Object', arg: 'result', root: true } ],
          http: { path, verb: 'get' },
        })

        // The remote method needs to be wrapped in a promise
        Model[fnNameRemote] = (options, params) => new Promise(resolve => resolve(Model[fnName](options, params)))

        // Send result as plain text if the content is a string
        Model.afterRemote(fnNameRemote, (ctx, result, next) => {
          if (typeof ctx.result !== 'string') {
            return next()
          }
          ctx.res.setHeader('Content-Type', 'text/plain')
          return ctx.res.end(ctx.result)
        })

        return Promise.resolve(config.acls).mapSeries(acl => {
          const templateAcl = Object.assign({}, acl)

          templateAcl.model = modelName
          templateAcl.property = fnNameRemote
          debug('Create ACL entry for %s.%s ', modelName, fnNameRemote)
          return app.models.ACL.create(templateAcl)
        })
      })
  })
}
