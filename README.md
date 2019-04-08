# Avimesa Infrastructure API Node Package (Alpha)
Node.js SDK for the Avimesa Infrastructure API using AMQP (0-9-1)

## Introduction

This project the source code for the **@avimesa/infra-api-amqp** npm package.

<a id="toc"></a>
## Table of Contents
- [1. Quick Start](#1.-quick-start)
- [2. API Reference](#2.-api-reference)
    - Connection Settings
        - [setConnParams](#2.0-api-reference)
    - Device Cloud Instance Level
        - [listGroups](#2.1-api-reference)
        - [addGroup](#2.2-api-reference)
        - [removeGroup](#2.3-api-reference)
    - Queue Level
        - [acctRecordListener](#2.20-api-reference)
        

<a id="1.-quick-start"></a>
## 1. Quick Start


Install the package:
```
npm install @avimesa/infra-api-amqp
```

Configure your API credentials using the following options:

### 1.1 Set Credentials using setConnParams

Use the `setConnParams` function before accessing the API:

```
const infraApi = require('@avimesa/infra-api-amqp');

infraApi.setConnParams({
    apiKey: '<** Enter API Key **>',
    apiPassword: '<** Enter API Password **>',
});
```

### 1.2 Load Credentials using .env file

update or add your .env file in the project root:
```
# API Key
API_KEY= <** Enter API Key **>

# API Password
API_PASSWORD= <** Enter API Password **>,
```

Load the package:
```
...
const infraApi = require('@avimesa/infra-api-amqp');
...
```

Use API per documentation, for example, listing Devices for the Group:

```
infraApi.listGroups(function(err, groups){
	if(!err){
		for (var i = 0; i < groups.length; i++){
			console.log(groups[i]);
		}
	}
});
```


[Top](#toc)<br>
<a id="2.-api-reference"></a>
## 2. API Reference

<a id="2.0-api-reference"></a>
### setConnParams

##### Summary

Set the connection parameters for the AMQP connection

```
const infraApi = require('@avimesa/infra-api-amqp');

infraApi.setConnParams({
    apiKey: '<** Enter API Key **>',
    apiPassword: '<** Enter API Password **>',
});
```

Note, you can override connection parameters as well:

```
infraApi.setConnParams({
    apiKey: '<** Enter API Key **>',
    apiPassword: '<** Enter API Password **>',
    hostname: 'rmqserv001.avimesa.com',
    port: 5671
    vhost: '<** By default, 'infrastructure' **>',
});
```


<a id="2.1-api-reference"></a>
### listGroups

##### Summary

Lists the Groups for the Device CLoud instance (which is specified in credentials in the .env file, or configured with the `setConnParams` call)

##### Callback

```
listGroups(function(err, groups){ ... })
```

Parameters:

The callback signature contains:

- `err` (boolean) - true if error, false otherwise
- `groups` (array) - array of group IDs in string form

##### Async

```
let response = await infraApi.listGroupsAsync();
```


[Top](#toc)<br>
<a id="2.2-api-reference"></a>
### addGroup

##### Summary

##### Callback

```
addGroup(apiKey, function(err, authKey, acctId){ ... })
```

Adds a Group to the Device Cloud.  If successful, a generated API Password and Accounting ID is provided in the response.    

Parameters:

- `apiKey` (string) - API Key (or Group Name).  Lower case, 32 characters, a-f0-9.


The callback signature contains:

- `err` (boolean) - true if error, false otherwise
- `apiPassword` (string) - the 128bit authentication key (32 characters, a-f0-9)
- `acctId` (Number) - the unsigned 32 bit accounting ID

Notes:

- Use the `validGroupId` utility function

##### Async

```
let response = await infraApi.addGroupAsync(apiKey);
```


[Top](#toc)<br>
<a id="2.3-api-reference"></a>
### removeGroup

##### Summary

##### Callback

```
removeGroup(apiKey, function(err, msg){ ... })
```

Removes a Group from the Device Cloud instance.  The Group must not have any Devices.  Any files or data cached for this Group in the Avimesa Device Cloud will be removed and trashed.

- **This may result in disabling a Group.  Proceed with caution only if you know what you're doing!**

Parameters:

- `apiKey` (string) - API Key (or Group Name).  Lower case, 32 characters, a-f0-9.


The callback signature contains:

- `err` (boolean) - true if error, false otherwise
- `msg` (string) - error message if there's an error

##### Async

```
let response = await infraApi.removeGroupAsync(apiKey);
```



[Top](#toc)<br>
<a id="2.20-api-reference"></a>
### acctRecordListener

##### Summary

Listens to the accounting record queue.

##### Callback

```
acctRecordListener(function(err, msg){ ... })
```

The callback signature contains:

- `err` (boolean) - true if error, false otherwise
- `msg` (object) - JSON record with `gid` (Group ID (Linux)), `did` (Device ID), `dts` (Linux upload time), `msg` (message count for transaction), and `jif` (jiffy count for transaction) in the given format (for example):

```
{
   "gid": 413400036,
   "did": “20010db80000000002c9bffffe1c7393”,
   "dts": 1526533115,
   "msg": 8,
   “jif”: 450
}
```



[Top](#toc)<br>
<a id="2.20-api-reference"></a>
### acctRecordConsume

##### Summary

Consumes the records from the accounting record queue.

##### Callback

```
acctRecordListener(function(err, msg, ackCb){ ... })
```

The callback signature contains:

- `err` (boolean) - true if error, false otherwise
- `msg` (object) - JSON record with `gid` (Group ID (Linux)), `did` (Device ID), `dts` (Linux upload time), `msg` (message count for transaction), and `jif` (jiffy count for transaction) in the given format (for example):

```
{
   "gid": 413400036,
   "did": “20010db80000000002c9bffffe1c7393”,
   "dts": 1526533115,
   "msg": 8,
   “jif”: 450
}
```

- `ackCb` (callback) - callback with signature like `function(ok){...}` used to indicate message is OK to ACK


[Top](#toc)<br>
