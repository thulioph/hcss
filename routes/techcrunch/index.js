const Xray = require('x-ray');

import { fsWrite } from '../utils';

// ====

const techCrunchRoute = (res, fileName) => {
    let x = Xray({
        filters: {
            slice: (string) => `${string.split(' ').slice(0, 15).join(' ')}...`,
        }
    });

    x('https://techcrunch.com/mobile/', {
        entry: 'title',
        posts: x('.river-block', [
            {
                title: '.post-title a',
                url: '.post-title a@href',
                timestamp: '.timestamp',
                author: x('.byline', {
                    name: 'a',
                    url: 'a@href'
                })
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

export default techCrunchRoute;