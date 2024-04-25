const { Auth } = require('../utils/common');
const { MerchantRepository } = require("../repositories");
const bcrypt = require('bcrypt');
const { response } = require("express");
const AppError = require("../utils/errors/app-error");
const { StatusCodes } = require("http-status-codes");
const jwt = require('jsonwebtoken');
const merchantRepo = new MerchantRepository();
const { ServerConfig } = require('../config');
const serverConfig = require("../config/server-config");

async function createUser(data) {
    try {
        const response = await merchantRepo.createUser(data.phoneNumber, data.password, data.purpose);
        return response;
    } catch (error) {
        console.log(error.name);
        if (error.name == 'SequelizeValidationError' || error.name == 'SequelizeUniqueConstraintError') {
            let explanation = [];
            error.errors.forEach((err) => {
                explanation.push(err.message);
            });
            throw new AppError(explanation, StatusCodes.BAD_REQUEST);
        }
        throw new AppError('Cannot create a new user object', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function signin(data) {
    try {
        console.log("merchant service in signin")
        console.log(data.phoneNumber)
        const user = await merchantRepo.getUser(data.phoneNumber);
        if (!user) {
            throw new AppError('No user found for the given phone number', StatusCodes.NOT_FOUND);
        }
        const passwordMatch = Auth.checkPassword(data.password, user.password);
        console.log("password match", passwordMatch)
        if (!passwordMatch) {
            throw new AppError('Invalid password', StatusCodes.BAD_REQUEST);
        }
        const jwt = Auth.createToken({ id: user.phoneNumber });
        console.log(jwt)
        return jwt;
    } catch (error) {
        if (error instanceof AppError) throw error;
        console.log(error);
        throw new AppError('Something went wrong', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function isAuthenticated(token) {
    try {
        if (!token) {
            throw new AppError('Missing JWT token', StatusCodes.BAD_REQUEST);
        }
        const response = verifyToken(token);
        const user = await merchantRepo.get(response.id);
        if (!user) {
            throw new AppError('No user found', StatusCodes.NOT_FOUND);
        }
        return user.id;
    } catch (error) {
        if (error instanceof AppError) throw error;
        if (error.name == 'JsonWebTokenError') {
            throw new AppError('Invalid JWT token', StatusCodes.BAD_REQUEST);
        }
        if (error.name == 'TokenExpiredError') {
            throw new AppError('JWT token expired', StatusCodes.BAD_REQUEST);
        }
        console.log(error);
        throw new AppError('Something went wrong', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}



module.exports = { createUser, signin, isAuthenticated};
