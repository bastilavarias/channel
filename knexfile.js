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

  production: {
    client: "pg",
    connection:
      "postgres://hyeysoihktebaf:ddee74c167868445428113343397e3e94b0a093fdad65c61f7473ab8a0a62dd4@ec2-52-71-231-180.compute-1.amazonaws.com:5432/d5vajd8fs2acpn",
    migrations: {
      directory: __dirname + "/src/db/migrations",
    },
    seeds: {
      directory: __dirname + "/src/db/seeds",
    },
  },
};
