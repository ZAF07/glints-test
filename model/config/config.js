module.exports = {
  development: {
    username: 'zaffere',
    password: null,
    database: 'glints',
    host: '127.0.0.1',
    port: '5432',
    dialect: 'postgres',
  },
  production: {
    use_env_variable: 'DATABASE_URL',
    dialect: 'postgres',
    protocol: 'postgres',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  },  
};