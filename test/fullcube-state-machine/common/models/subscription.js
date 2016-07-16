/* eslint filenames/match-regex: 0 */

const faker = require('faker/locale/en')

module.exports = function(Product) {

  Product._templates = () => ({
    basic: {
      status: faker.random.arrayElement([ 'active', 'disabled' ]),
    },
    full: {
      status: faker.random.arrayElement([ 'active', 'disabled' ]),
      provider: faker.random.arrayElement([ 'internal', 'external' ]),
      plan: faker.random.arrayElement([ 'paid', 'free' ]),
    },
  })

}
