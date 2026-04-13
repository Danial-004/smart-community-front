const path = require('path');

module.exports = ({ env }) => {
  const connectionString = env('DATABASE_URL');

  // ЕГЕР ИНТЕРНЕТТЕ (Render-де) ТҰРСА -> Neon PostgreSQL қолданады
  if (connectionString) {
    return {
      connection: {
        client: 'postgres',
        connection: {
          connectionString,
          ssl: {
            rejectUnauthorized: env.bool('DATABASE_SSL_SELF', false),
          },
        },
      },
    };
  }

  // ЕГЕР КОМПЬЮТЕРДЕ ТҰРСА -> бұрынғыша SQLite қолданады
  return {
    connection: {
      client: 'sqlite',
      connection: {
        filename: path.join(__dirname, '..', '..', env('DATABASE_FILENAME', '.tmp/data.db')),
      },
      useNullAsDefault: true,
    },
  };
};