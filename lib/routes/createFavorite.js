'use strict';

const Joi = require('joi')

// requête createFilm
module.exports = {
  method: 'post',
  path: '/favorite',
  options: {
      auth : {
        scope: [ 'user' ]
      },
      tags: ['api'],
      validate: {
        payload: Joi.object({
          id_film: Joi.number().integer().greater(0).required().example(1).description('id of the film'),
        })
      }
  },
  handler: async (request, h) => {

      const { favoriteService } = request.services();

      return await favoriteService.create(request.auth.credentials.idUser, request.payload);
  }
}