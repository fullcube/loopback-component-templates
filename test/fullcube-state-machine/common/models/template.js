const ProductTemplate = require('./template/product')
const PersonTemplate = require('./template/person')

module.exports = function(Template) {

  Template._templates = () => ({
    productBasic: ProductTemplate.basic(),
    productFull: ProductTemplate.full(),
    productShirt: ProductTemplate.shirt(),
    personBasic: PersonTemplate.basic,
    personFull: PersonTemplate.full(),
  })

};
