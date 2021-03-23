'use strict';

const Dotenv = require('dotenv');
const Confidence = require('confidence');
const Toys = require('toys');
const Schwifty = require('schwifty');

// Pull .env into process.env
Dotenv.config({ path: `${__dirname}/.env` });

// Glue manifest as a confidence store
module.exports = new Confidence.Store({
    server: {
        host: 'localhost',
        port: {
            $env: 'PORT',
            $coerce: 'number',
            $default: 3000
        },
        debug: {
            $filter: { $env: 'NODE_ENV' },
            $default: {
                log: ['error'],
                request: ['error']
            },
            production: {
                request: ['implementation']
            }
        }
    },
    register: {
        plugins: [
            {
                plugin: '../lib', // Main plugin
                options: {}
            },
            {
                plugin: './plugins/swagger'
            },
            // en commentaire la version générée de base sqlite3
            /*{
                plugin: 'schwifty',
                options: {
                    $filter: 'NODE_ENV',
                    $default: {},
                    $base: {
                        migrateOnStart: true,
                        knex: {
                            client: 'sqlite3',
                            useNullAsDefault: true,     // Suggested for sqlite3
                            connection: {
                                filename: ':memory:'
                            },
                            migrations: {
                                stub: Schwifty.migrationsStubPath
                            }
                        }
                    },
                    production: {
                        migrateOnStart: false
                    }
                }
            },*/
            // ici la version mysql en espérant que j'ai la même car j'ai pas dl avec docker
            {
                plugin  : 'schwifty',
                options : {
                    $filter    : 'NODE_ENV',
                    $default   : {},
                    $base      : {
                        migrateOnStart : true,
                        knex           : {
                            client     : 'mysql',
                            connection : { // configurations de la bd ici
                                host     : process.env.DB_HOST || '0.0.0.0',
                                user     : process.env.DB_USER || 'root',
                                password : process.env.DB_PASSWORD || '',
                                database : process.env.DB_DATABASE || 'tp node l260'
                            }
                        }
                },
                production : {
                        migrateOnStart : false
                    }
                }
            },
            {
                plugin: {
                    $filter: { $env: 'NODE_ENV' },
                    $default: 'hpal-debug',
                    production: Toys.noop
                }
            }
        ]
    }
});