const usersModel = require("../models/usersModel");
const messageModel = require("../models/messagesModel")
const helper = require("../helpers/printHelper");

exports.sendMessage = async (req, res) => {
    const { idFrom, idTo, type, chat, date } = req.body;
    const data = {
        idFrom,
        idTo,
        chat,
        type,
        date,
    };
    try {
        const user = await usersModel.findUser(idFrom, "cek pengirim");
        if (user < 1) {
            helper.printError(res, 400, `Cannot find one users with id = ${idFrom}`);
            return;
        } else {
            const receiver = await usersModel.findUser(idTo, "cek penerima");
            if (receiver < 1) {
                helper.printError(res, 400, `Cannot find one users with id = ${idTo}`);
                return;
            }
            await messageModel.createMessages(data);
            helper.printSuccess(res, 200, "Create Messages successfully", data);
        }
    } catch (err) {
        console.log(err);
        helper.printError(res, 400, `something wrong`);
    }
};

exports.findMessages = async (req, res) => {
    const { idFrom, idTo } = req.params;

    try {
        const getMessagesSender = await messageModel.getMessageByIdSender(idFrom);
        const getMessagesTarget = await messageModel.getMessageByIdSender(idTo);
        const result = [...getMessagesSender, ...getMessagesTarget];
        helper.printSuccess(res, 200, "Find messages successfully", result);
    } catch (err) {
        if (err.message === "Internal server error") {
            helper.printError(res, 500, err.message);
        }
        helper.printError(res, 400, err.message);
    }
};

exports.deleteHistory = (req, res) => {
    try {
        const id = req.params.id;
        messageModel
            .deleteHistoryChat(id)
            .then((response) => {
                if (response.affectedRows != 0) {
                    // Kalau ada yang terhapus
                    helper.printSuccess(res, 200, "deleting History Success", response);
                } else {
                    // Kalau tidak ada yang terhapus
                    helper.printError(res, 400, "Nothing Deleted, Wrong IDs");
                }
            })
            .catch((err) => {
                // Kalau ada salah di parameternya
                helper.printError(res, 400, "Wrong Parameter Type");
            });
    } catch (err) {
        // Kalau ada salah lainnya
        console.log(err.message);
        helper.printError(res, 500, "Internal Server Error");
    }
};