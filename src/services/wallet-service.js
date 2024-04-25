const { WalletRepository} = require("../repositories");

const { response } = require("express");

const walletRepo = new WalletRepository();



async function convertResponseData(responseData) {

    const convertedData = {
        phoneNumber: responseData[0].dataValues.phoneNumber,
        data: []
    };
    
    const notesMap = new Map();

    for (const currency of responseData) {
        const value = currency.dataValues.value.toString();
        if (notesMap.has(value)) {
            const count = notesMap.get(value) + 1;
            notesMap.set(value, count);
        } else {
            notesMap.set(value, 1);
        }
    }
    for (const [value, count] of notesMap.entries()) {
        convertedData.data.push({
            value: value,
            numberOfNotes: count
        });
    }
    return convertedData;

}

async function getSumOfNotes(convertedData) {
    let totalSum = 0;
    console.log(convertedData);
    for (const note of convertedData.data) {
        totalSum += parseInt(note.value) * parseInt(note.numberOfNotes);
    }
    return totalSum;
}

async function getWallet(id) {
    try {
        const response = await walletRepo.getPhoneNumber(id);
        return response;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

async function getWalletInfo(id) {
    try {
        const response = await walletRepo.getWalletInfo(Number(id));
        const convertedData = await convertResponseData(response);
        return convertedData;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

async function getWalletBalance(id) {
    try {
        let response = await walletRepo.getWalletInfo(Number(id));
        console.log("response in getwalletbalance" , response);
        if(response.length == 0 ){
            response=undefined;
            // return res.status(201).json(response);
            return response;
        }
        
        const convertedData = await convertResponseData(response);
        const totalBalance = await getSumOfNotes(convertedData);
        return totalBalance;
    } catch (error) {
        console.log(error);
        throw error;
    }
  
}

async function deleteNotes(phoneNumber, data) {
    try {
        let response = undefined;
        for (const note of Object.values(data)) {
            for (let i = 0; i < note.numberOfNotes; i++) {
                try {
                    response = await walletRepo.deleteNotes(phoneNumber, note.value);
                } catch (error) {
                    console.log(error);
                    throw error;
                }
            }
        }
        return response;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

async function getPhoneNumber(id) {
    try {
        const response = await walletRepo.getPhoneNumber(id);
        return response;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

async function addMoneyToWallet(phoneNumber, data) {
    try {
        console.log(phoneNumber, data)
        let response ;
        console.log("data=>", data);
        for (const note of Object.values(data)) {
            for (let i = 0; i < note.numberOfNotes; i++) {
                try {
                    response = await walletRepo.addMoneyToWallet(phoneNumber, note.value);

                } catch (error) {
                    console.log(error);
                    throw error;
                }
            }
        }
        console.log("response ", response)
        return response;
    } catch (error) {
        console.log(error);
        throw error;
    }

}


async function getAllNotesWithUsers() {
    try {
        const response = await walletRepo.getAllNotesWithUsers();
        return response;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

module.exports = { getWallet, deleteNotes, getPhoneNumber, addMoneyToWallet, getWalletInfo, getWalletBalance, getAllNotesWithUsers };
