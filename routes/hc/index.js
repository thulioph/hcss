const Xray = require('x-ray');

import { fsWrite } from '../utils';

// ====

const hcRoute = (res, fileName) => {
    let x = Xray();

    x('https://news.ycombinator.com', {
        entry: 'title',
        links: x('.athing', [
            {
                url: '.storylink@href',
                description: '.title a',
            }
        ]),
        author: x('.subtext', [
            {
                name: '.hnuser',
                url: '.hnuser@href',
                score: '.score',
                timestamp: '.age a'
            }
        ]),
    })((err, obj) => {
        if (!err) {
            fsWrite(fileName, obj, 'utf8', res);
        } else {
            res.json({
                message: err.message,
                code: err.code
            });
        }
    })
};

// ====

export default hcRoute;