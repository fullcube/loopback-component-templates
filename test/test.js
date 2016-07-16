/* eslint filenames/match-regex: 0 */
'use strict'

const Promise = require('bluebird')
const path = require('path')
const chai = require('chai')

require('sinon-as-promised')(Promise)

const expect = chai.expect

const TEST_APP = path.join(__dirname, 'fullcube-templates')
const app = require(path.join(TEST_APP, 'server/server.js'))

const Template = app.models.Template

describe('Component', function() {
  describe('Initialization', function() {
    it('should add a getStateMachine method to the app', function() {
      expect(Template).to.itself.respondTo('_templates')
    })
  })
})

describe('Create dummy data from templates', function() {
  before(function() {
    this.templates = Template._templates()
    console.log(this.templates)

  })

  it('should have templates defined', function() {
    expect(this.templates).to.be.an('object')
    expect(this.templates.personBasic).to.be.an('object')
    expect(this.templates.personCard).to.be.an('object')
    expect(this.templates.personFull).to.be.an('object')
    expect(this.templates.productBasic).to.be.an('object')
    expect(this.templates.productFull).to.be.an('object')
    expect(this.templates.productShirt).to.be.an('object')
    expect(this.templates.workflowBasic).to.be.an('object')
  })

  describe('should have methods defined', function() {
    console.log(this.templates)
    this.templateNames = Object.keys(this.templates)
    this.templateNames.forEach(templateName => {
      const methodName = `_template_${templateName}`

      it(`should had a method for template ${templateName}`, function() {
        expect(Template).to.itself.respondTo(methodName)
      })
    })
  })

})
