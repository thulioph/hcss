const fs = require('fs');

// ====

const resultRout = (res, filePath) => {
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            res.json({
                message: err.message,
                code: err.code
            })
        }

        if (data) {
            res.end(data)
        } else {
            res.json({
                message: 'No itens.',
                code: '123'
            })
        }
    });
};

// ====

export default resultRout;