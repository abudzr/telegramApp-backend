const connection = require("../configs/dbConfig");


exports.createMessages = (data) => {
    return new Promise((resolve, reject) => {
        connection.query(
            `INSERT INTO message SET ${data}`,
            (err, result) => {
                if (!err) {
                    resolve(result);
                } else {
                    reject(new Error("Internal server error"));
                }
            }
        )
    })
}

exports.getMessageById = (id) => {
    return new Promise((resolve, reject) => {
        connection.query("SELECT * FROM messages WHERE id = ?", id, (err, result) => {
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
        connection.query('SELECT * from users WHERE id = ?', idFrom, (err, result) => {
            if (!err) {
                resolve(result)
            } else {
                reject(err)
            }
        })
    })
}


exports.findReceivers = (idTo) => {
    return new Promise((resolve, reject) => {
        connection.query('SELECT * from users WHERE id = ?', idTo, (err, result) => {
            if (!err) {
                resolve(result)
            } else {
                reject(err)
            }
        })
    })
}