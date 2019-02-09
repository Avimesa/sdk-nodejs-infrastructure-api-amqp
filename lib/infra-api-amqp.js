/*
 * COPYRIGHT: This file and the source codes contained herein ("document") are
 * the property of Avimesa, Inc.  Copyright 2016-2018, Avimesa, Inc.
 *
 * LICENSE:  Avimesa, Inc. grants the RECIPIENT a worldwide, royalty free,
 * limited license to use the source codes in this document as specified
 * in the Avimesa Open License:  http://avimesa.com/openlicense.txt
 */

'use strict';

const models = require('./models');
const rmq = require('./rmq');
const utils = require('./utils');


function processRespCmd(cb, err, cmd){
	if(err){
		cb(true);
		return false;
	}
	else if (cmd.response.error){
		cb(true, cmd.response.message);
		return false;
	}
	return true;
}

/**
 * List Groups
 *
 * Sends a command 102 to list the groups(s) for the Device Cloud instance
 *
 * @param {Function} cb(err, groups): called on response
 *
 * @return none
 */
function listGroups(cb) {
	rmq.sendAdminCmd(models.cmd102(), function (err, cmd103) {
		if (processRespCmd(cb, err, cmd103)){
			cb(false, cmd103.response.message.groups);
		}
	});
}

/**
 * Add Group
 *
 * Sends a command 104 to add a groups to the Device Cloud instance
 *
 * @param {Function} cb(err, authKey, acctId): called on response
 *
 * @return none
 */
function addGroup(groupId, cb) {
	if (!utils.validGroupId(groupId)){
		cb(true, 'Invalid group ID');
		return;
	}

	rmq.sendAdminCmd(models.cmd104(groupId), function (err, cmd105) {
		if (processRespCmd(cb, err, cmd105)){
			cb(false, cmd105.response.message.auth_key, cmd105.response.message.linux_gid);
		}
	});
}

/**
 * Remove Group
 *
 * Sends a command 112 to remove a group from the Device Cloud instance
 *
 * @param {Function} cb(err, msg): called on response
 *
 * @return none
 */
function removeGroup(groupId, cb) {
	rmq.sendAdminCmd(models.cmd112(groupId), function (err, cmd113) {
		if (processRespCmd(cb, err, cmd113)){
			cb(false, "");
		}
	});
}

/**
 * Listens for accounting records
 *
 * Creates a temporary queue for accounting records.  It does not interface
 * with the dc_acct_q
 *
 * @param {Function} cb(err, msg): called on response
 *
 * @return none
 */
function acctRecordListener(cb) {
	rmq.subscribe("acct.dx", "dc",  function (err, msg) {
		if(err){
			cb(true, "");
		}
		else {
			cb(false, msg);
		}
	});
}

module.exports.listGroups = listGroups;
module.exports.addGroup = addGroup;
module.exports.removeGroup = removeGroup;

module.exports.acctRecordListener = acctRecordListener;
