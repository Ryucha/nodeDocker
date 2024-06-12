const crypto = require('crypto')

exports.createSalt = () => {
    const salt = crypto.randomBytes(32).toString("hex")

    return salt;
}

exports.encryption = (password, salt) => {
    return crypto.pbkdf2Sync(password, salt, 1, 32, "sha512").toString("hex");
}