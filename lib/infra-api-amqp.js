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


function processRespCmd(cb, err, msg){
	if(err){
		cb(true, msg);
		return false;
	}
	else if (msg.response.error){
		cb(true, msg.response.message);
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

function _listGroups(){
	return new Promise(resolve => {
		listGroups((err,groups) =>{
			resolve({err,groups});
		});
	});
}

/**
 * List Groups Async
 *
 * Sends a command 102 to list the groups(s) for the Device Cloud instance
 *
 * @param none
 *
 * @return command 103 response {err,groups}
 */
async function listGroupsAsync(){
	return await _listGroups();
}

/**
 * Add Group
 *
 * Sends a command 104 to add a groups to the Device Cloud instance
 *
 * @param {String} the group API Key (32 char, lower case, hex values (UUID without hashes)
 * @param {Function} cb(err, authKey, acctId): called on response
 *
 * @return none
 */
function addGroup(apiKey, cb) {
	if (!utils.validGroupId(apiKey)){
		cb(true, 'Invalid group ID');
		return;
	}

	rmq.sendAdminCmd(models.cmd104(apiKey), function (err, cmd105) {
		if (processRespCmd(cb, err, cmd105)){
			cb(false, cmd105.response.message.auth_key, cmd105.response.message.linux_gid);
		}
	});
}

function _addGroup(groupId){
	return new Promise(resolve => {
		addGroup(groupId, (err,apiPassword,accId) =>{
			resolve({err,apiPassword,accId});
		});
	});
}

/**
 * Add Group Async
 *
 * Sends a command 104 to add a groups to the Device Cloud instance
 *
 * @param {String} the API Key (32 char, lower case, hex values (UUID without hashes)
 *
 * @return none
 */
async function addGroupAsync(apiKey) {
	return await _addGroup(apiKey);
}

/**
 * Remove Group
 *
 * Sends a command 112 to remove a group from the Device Cloud instance
 *
 * @param {String} the API Key (32 char, lower case, hex values (UUID without hashes)
 * @param {Function} cb(err, msg): called on response
 *
 * @return none
 */
function removeGroup(apiKey, cb) {
	rmq.sendAdminCmd(models.cmd112(apiKey), function (err, cmd113) {
		if (processRespCmd(cb, err, cmd113)){
			cb(false, "");
		}
	});
}

function _removeGroup(apiKey){
	return new Promise(resolve => {
		removeGroup(apiKey, (err,cmd113) =>{
			resolve({err,cmd113});
		});
	});
}

/**
 * Remove Group Async
 *
 * Sends a command 112 to remove a group from the Device Cloud instance
 *
 * @param {String} the API Key (32 char, lower case, hex values (UUID without hashes)
 *
 * @return response {err,cmd113}
 */
async function removeGroupAsync(apiKey) {
	return await _removeGroup(apiKey);
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
module.exports.listGroupsAsync = listGroupsAsync;
module.exports.addGroup = addGroup;
module.exports.addGroupAsync = addGroupAsync;
module.exports.removeGroup = removeGroup;
module.exports.removeGroupAsync = removeGroupAsync;

module.exports.acctRecordListener = acctRecordListener;
