/*
 * COPYRIGHT: This file and the source codes contained herein ("document") are
 * the property of Avimesa, Inc.  Copyright 2016-2018, Avimesa, Inc.
 *
 * LICENSE:  Avimesa, Inc. grants the RECIPIENT a worldwide, royalty free,
 * limited license to use the source codes in this document as specified
 * in the Avimesa Open License:  http://avimesa.com/openlicense.txt
 */

'use strict';

const env = require('dotenv');

let hostname = "";
let port = 5671;
let vhost = "infrastructure";
let username = "";
let password = "";

// Load environment variables
env.config();

function getConnParams(){

	if (process.env.API_HOSTNAME){
		hostname = process.env.API_HOSTNAME;
	}
	if (process.env.API_PORT){
		port = process.env.API_PORT;
	}
	if (process.env.API_VHOST){
		vhost = process.env.API_VHOST
	}
	if (process.env.API_KEY){
		username = process.env.API_KEY;
	}
	if (process.env.API_PASSWORD){
		password = process.env.API_PASSWORD;
	}

	// Use environment variables for the connection paramaters for AMQP
	return {
		protocol: 'amqps',
		hostname: hostname,
		port: port,
		vhost: vhost,
		username: username,
		apiKey: username, // Avimesa addition
		password: password,
		apiPassword: password, // Avimesa addition
		locale: 'en_US',
		frameMax: 0,
		heartbeat: 0
	};
}

/**
 * setConnParams
 *
 * Sets the connection parameters for the API
 *
 * @param {Object} params:
 *                   params.apiKey (required)
 *                   params.apiPassword (required)
 *                   params.hostname (optional, default rmqserv001.avimesa.com)
 *                   params.port (optional, default 5671 for amqps)
 *                   params.vhost (optional, defaults to same value as API Key)
 *
 * @return none
 */
function setConnParams(params){
	if(!params || !params.apiKey || !params.apiPassword){
		throw 'Invalid params'
	}

	username = params.apiKey;
	password = params.apiPassword;

	// by default, API Key is same as vhost
	if(params.vhost){
		vhost = params.vhost;
	}

	if(params.hostname) {
		hostname = params.hostname;
	}

	if(params.port){
		port = params.port;
	}
}

function getRmqSettings(){
	return {
		queues: {
			dc_acct : 'dc_acct_q',
			sys_log : 'sys_log_q',
			admin_out : 'admin_out_q'
		},
		exchanges : {
			acct : 'acct.dx',
			log : 'log.dx',
			admin : 'admin.dx'
		},
		routingKeys : {
			dev_cloud : 'dc',
			sys : 'sys',
			admin_in : 'in',
			admin_out : 'out'
		}
	};
}

module.exports.getConnParams = getConnParams;
module.exports.setConnParams = setConnParams;
module.exports.getRmqSettings = getRmqSettings;
