const faker = require('faker/locale/en')

module.exports = {
  full: () => ({
    name: faker.commerce.productName(),
    description: faker.lorem.sentence(),
    group: `${faker.company.bsAdjective()} ${faker.company.bsNoun()}`,
    sku: `${faker.company.bsNoun()}-${faker.random.number()}`,
    inventoryLevel: faker.random.number(),
    weight: faker.random.number(),
    status: faker.random.arrayElement([ 'active', 'disabled' ]),
    backorderAllowed: faker.random.arrayElement([ true, false ]),
    recurring: faker.random.arrayElement([ true, false ]),
    visible: faker.random.arrayElement([ true, false ]),
  }),
  basic: () => ({
    name: faker.commerce.productName(),
    description: faker.lorem.sentence(),
  }),
}
