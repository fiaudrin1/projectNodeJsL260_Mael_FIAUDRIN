'use strict';

const Joi = require('joi');
const { Model } = require('schwifty');

module.exports = class Favorite extends Model {

    static get tableName() {
        return 'favorite';
    }

    static get joiSchema() {

        return Joi.object({
            id: Joi.number().integer().greater(0),
            id_user: Joi.number().integer().greater(0),
            id_film: Joi.number().integer().greater(0),
        });
    }
};