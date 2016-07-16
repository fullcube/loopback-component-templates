
const faker = require('faker/locale/en')

module.exports = {
  Application: () => ({
    name: faker.company.bsNoun(),
    description: faker.lorem.sentence(),
    realm: faker.company.bsAdjective(),
  }),
  Card: () => ({
    ccNumber: '4111111111111111',
    ccMonth: 12,
    ccYear: 2020,
    ccType: 'visa',
  }),
  Person: () => {
    const firstName = faker.name.firstName()
    const lastName = faker.name.lastName()
    const email = `${firstName}.${lastName}fake@fullcube.info`

    return {
      firstName,
      lastName,
      email,
      birthDate: faker.date.between('1950-01-01', '1990-01-01'),
      phone: faker.phone.phoneNumber(),
      phoneType: faker.random.arrayElement([ 'mobile', 'home' ]),
      gender: faker.random.arrayElement([ 'male', 'female', 'other' ]),
      country: faker.random.arrayElement([ 'US' ]),
      state: faker.address.stateAbbr(),
      street: faker.address.streetAddress(),
      city: faker.address.city(),
      zip: faker.address.zipCode(),
    }
  },
  Product: () => ({
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
  ProductBasic: () => ({
    name: faker.commerce.productName(),
    description: faker.lorem.sentence(),
  }),
  ProductShirt: () => {
    const type = faker.random.arrayElement([ 'red', 'black', 'blue' ])
    const size = faker.random.arrayElement([ 'S', 'M', 'L', 'XL' ])

    return {
      sku: `shirt-${type}-${size}`,
      name: `T-Shirt size ${size} color ${type}`,
      inventoryLevel: faker.random.number(),
    }
  },
  Program: () => ({
    name: faker.company.companyName(),
    url: faker.internet.url(),
    description: faker.lorem.sentence(),
    nextMemberId: faker.random.number(),
    timezone: 'America/New_York',
  }),
  User: () => {
    const firstName = faker.name.firstName()
    const lastName = faker.name.lastName()
    const email = `${firstName}.${lastName}fake@fullcube.info`

    return {
      firstName,
      lastName,
      email,
      password: 'password',
      passwordVerify: 'password',
      status: faker.random.arrayElement([ 'active', 'disabled' ]),
    }
  },
  WorkflowBasic: () => ({
    status: 'active',
    triggers: {
      triggerId: 'fullcube.campaign.joined',
      config: {
        campaign: {
          id: '123',
        },
      },
    },
    tasks: [ {
      taskId: 'fullcube.membership.create',
      config: {
        provider: 'fullcube',
        planId: 'complementary',
        membershipLevelId: '1',
      },
    } ],
  }),
}
