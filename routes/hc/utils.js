const fs = require('fs');

// ====

const fsWrite = (fileName, data, encoding, res) => {    
    fs.writeFile(fileName, JSON.stringify(data), encoding, (err) => {
        if (err) {
            res.json({
                message: err.message,
                code: err.code
            });
        } else {
            res.send('<h1>Everything is OK!</h1>');
        }
    });
};

// ====

export { 
    fsWrite
};