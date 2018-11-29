var assert = require('assert');
var path = require('path');
var process = require('process');
var api = require('../lib/models');

describe('models', function() {

	describe('#getRequestId()', function() {
		it('should return a request ID', function() {
			const id = api.getRequestId();
			assert.notEqual(id, 0);
		});
	});

	describe('#cmd102()', function() {
		it('should return a cmd102', function() {
			const cmd = api.cmd102();
			assert.equal(cmd.cmd_id, 102);
			assert.notEqual(cmd.req_id, 0);
		});
	});

	describe('#cmd104()', function() {
		it('should return a cmd104', function() {
			const groupId = '00000000000000000000000000000000';
			const cmd = api.cmd104(groupId);
			assert.equal(cmd.cmd_id, 104);
			assert.notEqual(cmd.req_id, 0);
			assert.equal(cmd.group_id, groupId);
		});
	});

	describe('#cmd112()', function() {
		it('should return a cmd112', function() {
			const groupId = '00000000000000000000000000000000';
			const cmd = api.cmd112(groupId);
			assert.equal(cmd.cmd_id, 112);
			assert.notEqual(cmd.req_id, 0);
			assert.equal(cmd.group_id, groupId);
		});
	});
});
