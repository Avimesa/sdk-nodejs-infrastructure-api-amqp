/*
 * COPYRIGHT: This file and the source codes contained herein ("document") are
 * the property of Avimesa, Inc.  Copyright 2016-2018, Avimesa, Inc.
 *
 * LICENSE:  Avimesa, Inc. grants the RECIPIENT a worldwide, royalty free,
 * limited license to use the source codes in this document as specified
 * in the Avimesa Open License:  http://avimesa.com/openlicense.txt
 */

'use strict';


const API_MAJ = 0;
const API_MIN = 11;


exports.getRequestId = function(){
	// 'random' 32 bit value
	return Math.round(Math.random() * (0xFFFFFFFF));
};


exports.cmd102 = function () {
	return {
		"api_maj": API_MAJ,
		"api_min": API_MIN,
		"cmd_id": 102,
		"req_id": this.getRequestId()
	};
};

exports.cmd104 = function(groupId) {
	return {
		"api_maj": API_MAJ,
		"api_min": API_MIN,
		"cmd_id": 104,
		"req_id": this.getRequestId(),
		"group_id": groupId
	};
};

exports.cmd112 = function(groupId) {
	return {
		"api_maj": API_MAJ,
		"api_min": API_MIN,
		"cmd_id": 112,
		"req_id": this.getRequestId(),
		"group_id": groupId
	};
};
