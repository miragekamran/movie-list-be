const knex = require('knex')
const configs = require('../knexfile')

const env = process.env.NODE_ENV || 'development'

module.exports = knex(configs[env])