const FcTemplates = require('./template/fc')

module.exports = function(Template) {

  Template._templates = params => ({
    Application: FcTemplates.Application(),
    Card: FcTemplates.Card(),
    Person: FcTemplates.Person(),
    PersonComplex: FcTemplates.PersonComplex(),
    Product: FcTemplates.Product(),
    ProductBasic: FcTemplates.ProductBasic(),
    ProductShirt: FcTemplates.ProductShirt(),
    Program: FcTemplates.Program(),
    Report: FcTemplates.Report(params),
    User: FcTemplates.User(),
    Workflow: FcTemplates.WorkflowBasic(),
  })

}
