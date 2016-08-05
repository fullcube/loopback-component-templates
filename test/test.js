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
  })

  it('should have templates defined', function() {
    expect(this.templates).to.be.an('object')
    expect(this.templates.Application).to.be.an('object')
    expect(this.templates.Card).to.be.an('object')
    expect(this.templates.Person).to.be.an('object')
    expect(this.templates.Product).to.be.an('object')
    expect(this.templates.ProductBasic).to.be.an('object')
    expect(this.templates.ProductShirt).to.be.an('object')
    expect(this.templates.Program).to.be.an('object')
    expect(this.templates.User).to.be.an('object')
    expect(this.templates.Workflow).to.be.an('object')
  })

  it('should have methods defined', function() {
    this.templateNames = Object.keys(this.templates)
    this.templateNames
      .filter(templateName => templateName !== 'Report')  // Do not run this test on the Report template
      .forEach(templateName => {
      const methodName = `_template_${templateName}`

      describe(`Template ${templateName}`, function() {
        it(`should have a method for template ${templateName}`, function() {
          expect(Template).to.itself.respondTo(methodName)
        })

        it(`should respond to the method for template ${templateName}`, function() {
          const result = Template[methodName].call()

          expect(result).to.be.an('object')
        })

        it(`should override options in the template ${templateName}`, function() {
          const result = Template[methodName].call(this, { programId: '123' })

          expect(result.programId).to.equal('123')
        })

      })
    })
  })

  it('should be possible to override deep properties', function() {
    const result = Template['_template_Workflow'].call(this, {
      programId: '123456789',
      'triggers.config.campaign.id': '987654321'
    })

    expect(result.programId).to.equal('123456789')
    expect(result.triggers.config.campaign.id).to.equal('987654321')
  })

  it('should be possible to replace string values in templates', function() {
    const programId = 'the-program-id'
    const result = Template['_template_Report'].call(this, {}, {'PROGRAM_ID': programId})

    expect(result).to.be.a('string')
    expect(result).to.contain(programId)
  })

})
