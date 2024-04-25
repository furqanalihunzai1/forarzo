const {Auth}= require ('../utils/common');
const { UserRepository } = require("../repositories");
const bcrypt = require('bcrypt');
const { response } = require("express");
const AppError = require("../utils/errors/app-error");
const { StatusCodes } = require("http-status-codes");
const jwt= require('jsonwebtoken');
const userRepo = new UserRepository();
const {ServerConfig}= require('../config');
const serverConfig = require("../config/server-config");

async function createUser(data) {
    try {
        const response = await userRepo.createUser(data.name, data.phoneNumber, data.password, data.pincode);
        return response;
    } catch(error) {
        console.log(error.name);
        if (error.name == 'SequelizeValidationError' || error.name == 'SequelizeUniqueConstraintError') {
            let explanation = [];
            error.errors.forEach((err) => {
                explanation.push(err.message);
            });
            throw new AppError(explanation, StatusCodes.BAD_REQUEST);
        }
        console.log(error)
        throw new AppError('Cannot create a new user object', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function getUser(id) {
    try {
        const response = await userRepo.getUser(id);
        return response;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

async function signin(data) {
    try {
        console.log("user service in signin")
        console.log(data.phoneNumber)
        
        const user = await userRepo.getUser(BigInt(data.phoneNumber));
        if (!user) {
            throw new AppError('No user found for the given phone number', StatusCodes.NOT_FOUND);
        }
        const passwordMatch = Auth.checkPassword(data.password, user.password);
        console.log("password match", passwordMatch)
        if (!passwordMatch) {
            throw new AppError('Invalid password', StatusCodes.BAD_REQUEST);
        }
        const jwt = Auth.createToken({ id: user.phoneNumber });
        console.log("jwt token created: ", jwt)
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
        const user = await userRepo.get(response.id);
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


async function setPincode(id, pincode) {
    try {
        const response = await userRepo.setPincode(id, pincode);
        return response;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

async function getPincode(id) {
    try {
        // console.log("id in user-service", id)
        const response = await userRepo.getPincode(id);
        // console.log("response in user-service =>", response)
        return response;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

module.exports = { createUser, getUser, getPincode, setPincode, signin,  isAuthenticated };
