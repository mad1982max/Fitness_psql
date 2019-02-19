const fs = require('fs');

module.exports.logger = (req, res, next) => {
    const message = {
        date: new Date().toLocaleString(),
        url: req.url,
        method: req.method
    };
    fs.appendFileSync('log.txt', `${JSON.stringify(message)}\n`);
    console.log('******query wag logged to log.txt');
    next();
};