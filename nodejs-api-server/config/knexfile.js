module.exports = {
  // Development configuration for Knex SQL Builder to initiate a connection to the PostgresDB.
  development: {
    client: "postgresql",
    connection: {
      // Temporarily add catch values if there is no .env in the directory.
      host: process.env.DATABASE_HOST || "db",
      user: process.env.DATABASE_USER || "postgres",
      password: process.env.DATABASE_PASSWORD || "password",
      database: process.env.DATABASE || "postgres",
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: "knex_migrations",
    },
  },
};
