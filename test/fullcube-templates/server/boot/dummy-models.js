const Promise = require('bluebird')

module.exports = function(app, cb) {

  const recipe = {
    Product: [
      {
        template: 'Product',
        amount: 0,
      }, {
        template: 'ProductBasic',
        amount: 0,
      }, {
        template: 'ProductShirt',
        amount: 20,
      },
    ],
    Person: [
      {
        template: 'Person',
        amount: 10,
      },
    ],
  }

  const modelNames = Object.keys(recipe)
  const promises = []

  modelNames.forEach(modelName => {
    const Model = app.models[modelName]

    recipe[modelName].forEach(dummyModel => {
      for (let i = 0; i < dummyModel.amount; i++) {
        const dummy = app.models.Template._templates()[dummyModel.template]

        promises.push(Model.create(dummy))
      }
    })
  })

  return Promise
    .all(promises)
    .then(res => console.log('%s dummy models created', res.length))
    .then(cb)
    .catch(cb)
}
