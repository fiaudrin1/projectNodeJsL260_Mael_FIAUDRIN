'use strict';

const Joi = require('joi');

const Encrypt = require('@fiau372/iut-encrypt');

const Jwt = require('@hapi/jwt');

// requête createUser
module.exports = {
  method: 'post',
  path: '/user/login',
  options: {
      auth: false,
      tags: ['api'],
      validate: {
        payload: Joi.object({
          mail: Joi.string().required().min(8).example('mael@gmail.com').description('mail of the user'),
          password: Joi.string().required().min(8).example('azertyuiop').description('password of the user')
        })
      }
  },
  handler: async (request, h) => {

      const { userService } = request.services();

      const passewordCrypted = await userService.login(request.payload);

      if(Encrypt.compareSha1(request.payload.password, passewordCrypted[0].password)){
          console.log('Connexion validée');

          const token = Jwt.token.generate(
            {
                aud: 'urn:audience:iut',
                iss: 'urn:issuer:iut',
                idUser: passewordCrypted[0].id,
                firstName: passewordCrypted[0].firstName,
                lastName: passewordCrypted[0].lastName,
                mail: passewordCrypted[0].mail,
                scope: passewordCrypted[0].role
            },
            {
                key: 'random_string', // La clé qui est définit dans lib/auth/strategies/jwt.js
                algorithm: 'HS512'
            },
            {
                ttlSec: 14400 // 4 hours
            }
        );


          return "{ login: 'successful' }\r\n \r\n" + token;
      } else {
          throw new Error("401 Unauthorized");
      }
  }
}