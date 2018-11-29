# Avimesa Infrastructure API Node Package (Alpha)
Node.js SDK for the Avimesa Infrastructure API using AMQP (0-9-1)

## Introduction

This project the source code for the **@avimesa/infra-api-amqp** npm package.

<a id="toc"></a>
## Table of Contents
- [1. Quick Start](#1.-quick-start)
- [2. API Reference](#2.-api-reference)
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

Update or add your .env file in the project root:
```
# RMQ Server Hostname
RMQ_HOSTNAME=rmqserv001.avimesa.com

# RMQ Server Port
RMQ_PORT=5671

# RMQ Group ID / Vhost
RMQ_GROUP_ID= ** TODO **

# RMQ Authentication Key
RMQ_AUTH_KEY= ** TODO **

# Set this to 0 to allow certless TLS
NODE_TLS_REJECT_UNAUTHORIZED=0
```

Load the package:
```
...
const api = require('@avimesa/infra-api-amqp');
...
```

Use API per documentation, for example, listing Devices for the Group:

```
api.listGroups(function(err, groups){
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

<a id="2.1-api-reference"></a>
### listGroups

##### Callback

```
listGroups(function(err, groups){ ... })
```

Lists the Groups for the Device CLoud instance (which is specified in credentials in the .env file)

Parameters:

The callback signature contains:

- `err` (boolean) - true if error, false otherwise
- `groups` (array) - array of group IDs in string form




[Top](#toc)<br>
<a id="2.2-api-reference"></a>
### addGroup

##### Callback

```
addGroup(groupId, function(err, authKey){ ... })
```

Adds a Group to the Device Cloud.  If successful, a generated Authentication Key is provided in the response.    

Parameters:

- `groupId` (string) - Group name.  Lower case, 32 characters, a-f0-9.


The callback signature contains:

- `err` (boolean) - true if error, false otherwise
- `authKey` (string) - the 128bit authentication key (32 characters, a-f0-9)

Notes:

- Use the `validGroupId` utility function




[Top](#toc)<br>
<a id="2.3-api-reference"></a>
### removeGroup

##### Callback

```
removeGroup(groupId, function(err, msg){ ... })
```

Removes a Group from the Device Cloud instance.  The Group must not have any Devices.  Any files or data cached for this Group in the Avimesa Device Cloud will be removed and trashed.

- **This may result in disabling a Group.  Proceed with caution only if you know what you're doing!**

Parameters:

- `groupId` (string) - Group name.  Lower case, 32 characters, a-f0-9.


The callback signature contains:

- `err` (boolean) - true if error, false otherwise
- `msg` (string) - error message if there's an error


[Top](#toc)<br>
<a id="2.20-api-reference"></a>
### acctRecordListener

##### Callback

```
acctRecordListener(function(err, msg){ ... })
```

Listens to the accounting record queue.

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
