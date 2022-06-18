const bcrypt = require("bcrypt");


exports.generateHash = async (password) => {
    const saltRounds = parseInt(process.env.SALT_ROUNDS);
    const hash = await bcrypt.hash(password, saltRounds);
    return hash;
}

// exports.comparePassword = async (password, hash) => {
//     return await bcrypt.compare(password, hash);
// }

