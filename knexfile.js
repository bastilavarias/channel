module.exports = {
  development: {
    client: "pg",
    connection: "postgres://postgres:password@localhost:5432/channel",
    migrations: {
      directory: __dirname + "/src/db/migrations",
    },
    seeds: {
      directory: __dirname + "/src/db/seeds",
    },
  },
};
