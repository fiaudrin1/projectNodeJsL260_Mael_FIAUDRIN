'use strict';

module.exports = {

    async up(knex) {
        
        await knex.schema.createTable('favorite', (table) => {
            table.increments('id').primary();
            table.integer('id_user').notNull();
            table.integer('id_film').notNull();

        });
    },

    async down(knex) {

        await knex.schema.dropTableIfExists('favorite');
    }
};