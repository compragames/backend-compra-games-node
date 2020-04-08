module.exports = {
  dialect: 'postgres',
  host: 'localhost',
  username: 'postgres',
  password: 'docker',
  database: 'compragames',
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
  },
};
