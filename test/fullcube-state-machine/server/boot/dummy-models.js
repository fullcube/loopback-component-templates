const Promise = require('bluebird')

module.exports = function(app, cb) {

  const recipe = {
    Product: [
      {
        template: 'full',
        amount: 0,
      }, {
        template: 'basic',
        amount: 0,
      }, {
        template: 'shirt',
        amount: 20,
      },
    ],
    Subscription: [
      {
        template: 'basic',
        amount: 10,
      }, {
        template: 'full',
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
        const dummy = app.models[modelName]._templates()[dummyModel.template]

        promises.push(Model.create(dummy))
      }
    })
  })

  return Promise
    .all(promises)
    .then(res => console.log('%s dummy models created', res.length))
    .then(cb)
    .catch(cb)
  // console.log(dummyData)

  //
  // console.log(`Dummy Models: Models with _templates found: %o`, recipe)
  //
  // recipe.forEach(dummyModel => {
  //   for(var i = 0; i < 100; i++) {
  //     console.log('dummyModel 1', app.models[dummyModel]._templates)
  //
  //   }
  //
  // })
  //
  // return process.nextTick(cb)
  //

};
