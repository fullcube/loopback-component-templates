# loopback-component-templates

[![Greenkeeper badge](https://badges.greenkeeper.io/fullcube/loopback-component-templates.svg)](https://greenkeeper.io/)
Define complex data templates for loopback models

[![Circle CI](https://circleci.com/gh/fullcube/loopback-component-templates.svg?style=svg)](https://circleci.com/gh/fullcube/loopback-component-templates) [![Dependencies](http://img.shields.io/david/fullcube/loopback-component-templates.svg?style=flat)](https://david-dm.org/fullcube/loopback-component-templates) [![Coverage Status](https://coveralls.io/repos/github/fullcube/loopback-component-templates/badge.svg?branch=master)](https://coveralls.io/github/fullcube/loopback-component-templates?branch=master)


### Installation

1. Install in you loopback project:

  `npm install --save loopback-component-templates`

2. Create a component-config.json file in your server folder (if you don't already have one)

3. Configure options inside `component-config.json`. *(see configuration section)*

  ```json
  {
    "loopback-component-templates": true
  }
  ```

### Usage

1. Define a template config on a Model._templates property.

2. Define the templates that generate dummy data. 
In this example we add a remote method called `_template_basic` to the Product model.

  ```(javascript)
  const faker = require('faker/locale/en')
  Product._templates = () => ({
    basic: () => ({
      name: faker.commerce.productName(),
      description: faker.lorem.sentence(),
    }),
  })
  ```

### TODO:

- Add way to create related/deep structures
- Add option to Validate template generators
