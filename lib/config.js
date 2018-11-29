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
let port = 0;
let vhost = "";
let username = "";
let password = "";

// Load environment variables
env.config();

function getConnParams(){

	// Use environment variables for the connection paramaters for AMQP
	return {
		protocol: 'amqps',
		hostname: hostname,
		port: port,
		vhost: vhost,
		username: username,
		password: password,
		locale: 'en_US',
		frameMax: 0,
		heartbeat: 0
	};
}

function setConnParams(params){
	hostname = params.hostname;
	port = params.port;
	vhost = params.vhost;
	username = params.username;
	password = params.password;
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
