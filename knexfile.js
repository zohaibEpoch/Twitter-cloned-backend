export default {
  client: "pg",
  connection: {
    host: "127.0.0.1",
    user: "postgres",
    password: "123",
    database: "twiterApp",
  },
  migrations: {
    directory: "./db/migrations",
  },
};
