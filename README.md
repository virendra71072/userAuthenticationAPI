# Assignment for API to user Authentication API (Create, login, forgot password, reset Password) Using Nodes

### Dependencies
Node, mysql


### Installation
//Default port set on 8080 for API

Run the following commands.

``` bash
git clone https://github.com/virendra71072/userAuthenticationAPI.git
cd userAuthenticationAPI

Need to import database file from database folder
Need to configure configure.development file
Set Permission to asset folder for logger

npm install;
npm start;
```

### API LIST
```
1. http://localhost:8080/api/v1/user/create
	Description: API to register new user info

	method : POST
	body: {
			"name" :"<<User Name>>",
			"email":"<<Email>>",
			"password": "<<Password>>",
			"confirmPassword":"<<Password>>"
		}

	O/p:
	{
	    "status": true,
	    "statusCode": "0",
	    "statusMessage": "Success",
	    "response": true
	}

2. http://localhost:8080/api/v1/user/login
	Description: API for login user

	method : POST
	body: {
			"email":"<<Email>>",
			"password": "<<Password>>"
		}

	O/p:
	{
	    "status": true,
	    "statusCode": "0",
	    "statusMessage": "Success",
	    "response": {
	        "userId": "d21e5bfc-0f8e-4b55-9b01-1c665b3cd262",
	        "name" :"<<User Name>>",
			"email":"<<Email>>",
	    }
	}

3. http://localhost:8080/api/v1/user/password.forgot
	Description: API to send randam password to user email id

	method : POST
	body: {
			"email":"<<Email>>"
		}

	O/p:
	{
	    "status": true,
	    "statusCode": "0",
	    "statusMessage": "Success",
	    "response": "Random password has been set & sent to you by email. Please use that password to set new password"
	}

3. http://localhost:8080/api/v1/user/password.reset
	Description: API to change user password different from current password.

	method : POST
	body: {
			"email":"<<Email>>"
			"currentPassword": "<<current Password>>"
			"password": "<<Password>>"
			"confirmPassword": "<<Password>>"
		}

	O/p:
	{
	    "status": true,
	    "statusCode": "0",
	    "statusMessage": "Success",
	    "response": true
	}
```

## Contributors
```
 1. Virendra kumar singh
```