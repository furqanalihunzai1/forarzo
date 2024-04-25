const { UserService } = require('../services')
const { SuccessResponse, ErrorResponse } = require('../utils/common');
const { StatusCodes } = require('http-status-codes')
const { Auth } = require('../utils/common');
const { compareSync } = require('bcrypt');


async function signup(req, res) {
	try {
		const user = await UserService.createUser({
			name: req.body.name,
			phoneNumber: req.body.phoneNumber,
			password: req.body.password,
			pincode : req.body.pincode
		});
		SuccessResponse.data = user;
		return res
			.status(StatusCodes.CREATED)
			.json(SuccessResponse);
	} catch (error) {
		console.log(error);
		ErrorResponse.error = error;
		return res
			.status(error.statusCode)
			.json(ErrorResponse);
	}
}


async function signin(req, res) {
	try {
		console.log("User: ", req.body)
		const user = await UserService.signin({
			phoneNumber: req.body.phoneNumber,
			password: req.body.password
		});
		SuccessResponse.data = user;
		return res
			.status(StatusCodes.CREATED)
			.json(SuccessResponse);
	} catch (error) {
		console.log(error);
		ErrorResponse.error = error;
		return res
			.status(error.statusCode)
			.json(ErrorResponse);
	}
}

async function getUser(req, res) {
	try {
		const response = await UserService.getUser(req.body.phoneNumber);
		SuccessResponse.data = response;
		return res.status(201).json(SuccessResponse)
	} catch (error) {
		ErrorResponse.error = error;
		return res.status(500).json(ErrorResponse)
	}
}

async function setPincode(req, res) {
	try {
		const response = await UserService.setPincode(req.body.phoneNumber, req.body.pincode);
		SuccessResponse.data = response;
		return res.status(201).json(SuccessResponse)
	} catch (error) {
		ErrorResponse.error = error;
		return res.status(500).json(ErrorResponse)
	}
}

async function getPincode(req, res) {
	try {
		const response = await UserService.getPincode(req.body.phoneNumber);
		SuccessResponse.data = response;
		return res.status(201).json(SuccessResponse)
	} catch (error) {
		ErrorResponse.error = error;
		return res.status(500).json(ErrorResponse)
	}
}

async function checkPincode(req, res) {
	try {
		const response = await UserService.getPincode(req.body.phoneNumber);
		if (response.pincode == req.body.pincode) {
			let SuccessResponse = {
				"success": true,
				"message": "Pincode verified",
				"error": {}
			}
			return res.status(201).json(SuccessResponse)
		}
		else {
			ErrorResponse.error = error;
			return res.status(500).json(ErrorResponse)
		}
	} catch (error) {
		ErrorResponse.error = error;
		return res.status(500).json(ErrorResponse)
	}
}


module.exports = { getUser, setPincode, getPincode, checkPincode, signin, signup };