const fs = require('fs');

// ====

const fsWrite = (fileName, data, encoding, res) => {
    fs.writeFile(fileName, JSON.stringify(data), encoding, (err) => {
        if (err) {
            let obj = {
                message: err.message,
                code: err.code
            };

            res.json(obj)
        } else {
            let obj = {
                message: '<h1>Everything is OK!</h1>',
                code: 200
            };

            res.json(obj);
        }
    });
};

// ====

export { 
    fsWrite
};