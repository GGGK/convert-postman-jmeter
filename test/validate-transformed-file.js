const convertPostmanJmeter = require('../lib/convert-postman-jmeter.js');
const fs = require('fs');
const assert = require('assert');

// eslint-disable-next-line max-len
const filePostmanProject = 'test/resources/test-api-without-environments.postman_collection.json';
// eslint-disable-next-line max-len
const fileJmeterProject = 'test/resources/test-api-without-environments.postman_collection.jmx';
const headerLine = '<stringProp name="Header.name">Content-Type</stringProp>';

beforeEach(function() {
  const options = {
    projectPostman: filePostmanProject,
    projectJmeter: fileJmeterProject,
    override: true,
  };

  convertPostmanJmeter.convert(options);
});

describe('Convert tool and parsing', function() {
  context('parsing file transformed', function() {
    it('Validate exists header managers', function() {
      fs.readFile(fileJmeterProject, function(err, data) {
        if (err) assert.ok(false);
        assert.ok(data.includes(headerLine));
      });
    });
    it('Validate methods generated', function() {
      fs.readFile(fileJmeterProject, function(err, data) {
        if (err) assert.ok(false);
        assert.ok(data.includes('testname="List users"'));
        assert.ok(data.includes('testname="Create users"'));
        assert.ok(data.includes('testname="Delete user"'));
        assert.ok(data.includes('testname="Update user"'));
      });
    });
  });
});
