const ProductTemplate = require('./template/product')

module.exports = function(Product) {

  Product._templates = () => ({
    basic: ProductTemplate.basic(),
    full: ProductTemplate.full(),
    shirt: ProductTemplate.shirt(),
  })

}
