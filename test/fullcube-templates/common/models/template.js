const FcTemplates = require('./template/fc')

module.exports = function(Template) {

  Template._templates = () => ({
    Application: FcTemplates.Application(),
    Card: FcTemplates.Card(),
    Person: FcTemplates.Person(),
    PersonComplex: FcTemplates.PersonComplex(),
    Product: FcTemplates.Product(),
    ProductBasic: FcTemplates.ProductBasic(),
    ProductShirt: FcTemplates.ProductShirt(),
    Program: FcTemplates.Program(),
    User: FcTemplates.User(),
    Workflow: FcTemplates.WorkflowBasic(),
  })

}
