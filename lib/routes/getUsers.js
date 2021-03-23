'use strict';

const Joi = require('joi')


module.exports = {
    method: 'get',
    path: '/users',
    options: {
        tags: ['api'],
        auth : {
            scope: [ 'user', 'admin' ]
        }
    },
    handler: async (request, h) => {

       const { userService } = request.services();

       return await userService.getAllUsers();
    }
};
