var generator = require("generate-password");

exports.generatePassword = () => {
    return generator.generate({
        length: 10,
        numbers: true,
    });
};
