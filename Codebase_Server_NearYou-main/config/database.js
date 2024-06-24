const { Sequelize } = require("sequelize");

let sequelize;

if (process.env.DATABASE_URL) {
  // Wenn die Umgebungsvariable DATABASE_URL gesetzt ist (das ist der Fall auf Heroku)
  sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: "postgres",
    protocol: "postgres",
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false, // Für lokale Entwicklung
      },
    },
  });
} else {
  // Lokale Entwicklungseinstellungen
  sequelize = new Sequelize("postgres", "postgres", "123", {
    host: "localhost",
    dialect: "postgres",
    pool: {
      max: 50,
      min: 0,
      acquire: 30000,
      idle: 50000,
    },
  });
}

module.exports = sequelize;

