module.exports = {
  dialect: 'postgres',
  host: process.env.HOST,
  username: process.env.USERNAME,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
  },
};
// module.exports = {
//   dialect: 'postgres',
//   host: 'localhost',
//   username: 'postgres',
//   password: 'docker',
//   database: 'compragames',
//   define: {
//     timestamps: true,
//     underscored: true,
//     underscoredAll: true,
//   },
// };
module.exports = {
  dialect: 'postgres',
  host: 'tuffi.db.elephantsql.com',
  username: 'bepqouxy',
  password: 'hIlJ9cNNCfxRqo7NNfxH6gjSeE69BnJF',
  database: 'bepqouxy',
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
  },
};
// cluster do postgres
// https://customer.elephantsql.com/instance
