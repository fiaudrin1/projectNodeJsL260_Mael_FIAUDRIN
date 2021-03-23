'use strict';

module.exports = {

    async up(knex) {

        await knex.schema.dropTable('user')

        await knex.schema.createTable('user', (table) => {

            table.increments('id').primary();
            table.string('firstName').notNull();
            table.string('lastName').notNull()

            table.dateTime('createdAt').notNull().defaultTo(knex.fn.now());
            table.dateTime('updatedAt').notNull().defaultTo(knex.fn.now());

            table.string('password').notNull();
            table.string('mail').notNull();
            table.string('username').notNull();
            
            table.string('role').notNull();
        });
    },

    async down(knex) {

        await knex.schema.dropTableIfExists('user');
    }
};