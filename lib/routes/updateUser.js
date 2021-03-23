'use strict';

const Joi = require('joi')

const Encrypt = require('@fiau372/iut-encrypt');

// requête createUser
module.exports = {
  method: 'patch',
  path: '/user',
  options: {
      auth : {
        scope: [ 'admin' ]
      },
      tags: ['api'],
      validate: {
        payload: Joi.object({
          id: Joi.number().integer().min(1).description("Id of the user"),
          firstName: Joi.string().required().min(3).example('John').description('Firstname of the user'),
          lastName: Joi.string().required().min(3).example('Doe').description('Lastname of the user'),
          password: Joi.string().required().min(8).example('azertyuiop').description('password of the user'),
          mail: Joi.string().required().min(8).example('mael@gmail.com').description('mail of the user'),
          username: Joi.string().required().example('jojo').description('username of the user')
        })
      }
  },
  handler: async (request, h) => {

      const { userService } = request.services();

      // crypt mdp pour l'envoyer en BD
      request.payload.password = Encrypt.sha1(request.payload.password);

      return await userService.update(request.payload);
  }
}