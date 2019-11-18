module.exports = {
  database: process.env.DATABASE_URL || 'mongodb://localhost/testDB',
  port: process.env.PORT || 8088,
  jwtToken: process.env.JWT_SECRET,
};
