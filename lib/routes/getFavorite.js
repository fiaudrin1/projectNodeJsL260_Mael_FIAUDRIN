'use strict';

const Joi = require('joi')


module.exports = {
    method: 'get',
    path: '/favoriteList',
    options: {
        tags: ['api'],
        auth : {
            scope: [ 'user' ]
        }
    },
    handler: async (request, h) => {

       const { favoriteService } = request.services();

       return await favoriteService.getList(request.auth.credentials.idUser);
    }
};
