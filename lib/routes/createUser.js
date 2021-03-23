'use strict';

const Joi = require('joi')

const Encrypt = require('@fiau372/iut-encrypt');




// requête createUser
module.exports = {
  method: 'post',
  path: '/user',
  options: {
      auth: false,
      tags: ['api'],
      validate: {
        payload: Joi.object({
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
      const { mailService } = request.services();

      // crypt mdp pour l'envoyer en BD
      request.payload.password = Encrypt.sha1(request.payload.password);

      mailService.mailUserCreation(request.payload);

      return await userService.create(request.payload);
  }
}