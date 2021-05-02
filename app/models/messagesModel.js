const connection = require("../configs/dbConfig");

exports.createMessages = (data) => {
    return new Promise((resolve, reject) => {
        connection.query("INSERT INTO messages SET ?", data, (err, result) => {
            if (!err) {
                resolve(result);
            } else {
                reject(err)
                reject(new Error("Internal server error"));
            }
        });
    });
};


exports.getMessageByIdSender = (id) => {
    return new Promise((resolve, reject) => {
        connection.query("SELECT * FROM messages WHERE idFrom = ?", id, (err, result) => {
            if (!err) {
                resolve(result);
            } else {
                reject(new Error("Internal server error"));
            }
        });
    });
};

exports.deleteHistoryChat = (id) => {
    return new Promise((resolve, reject) => {
        connection.query(
            `DELETE FROM messages WHERE id = ${id}`,
            (error, result) => {
                if (error) {
                    console.log("error delete", error.message);
                    reject(new Error(error));
                } else {
                    resolve(result);
                }
            }
        );
    });
},






    exports.getMessageByIdReceiver = (id) => {
        return new Promise((resolve, reject) => {
            connection.query("SELECT * FROM messages WHERE idTo = ?", id, (err, result) => {
                if (!err) {
                    resolve(result);
                } else {
                    reject(new Error("Internal server error"));
                }
            });
        });
    };

exports.findUsers = (idFrom) => {
    return new Promise((resolve, reject) => {
        connection.query("SELECT * from users WHERE id = ?",
            idFrom,
            (err, result) => {
                if (!err) {
                    resolve(result)
                } else {
                    reject(new Error("Internal server error"));
                }
            })
    })
}


exports.findReceivers = (idTo) => {
    return new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM users WHERE id =${idTo}`,
            (err, result) => {
                if (!err) {
                    resolve(result)
                } else {
                    reject(new Error("rece"));
                }
            })
    })
}