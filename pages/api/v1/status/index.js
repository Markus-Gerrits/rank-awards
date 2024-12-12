import database from "infra/database.js";

async function status(request, response) {
  const updateAt = new Date().toISOString();
  const serverVersion = await database.query("SHOW server_version;");
  const maxConnections = await database.query("SHOW max_connections;");
  const databaseName = process.env.POSTGRES_DB;
  const usedConnections = await database.query({
    text: "SELECT COUNT(*)::int FROM pg_stat_activity WHERE datname = $1;",
    values: [databaseName],
  });

  response.status(200).json({
    update_at: updateAt,
    dependencies: {
      database: {
        version: serverVersion.rows[0].server_version,
        max_connections: parseInt(maxConnections.rows[0].max_connections),
        used_connections: usedConnections.rows[0].count,
      },
      enigma_do_medo: {
        steam: "Enigma do Medo ta custando só R$65,00 na steam!",
        nuuvem: "Enigma do Medo ta custando só R$55,00 na Nuuvem!",
      },
    },
  });
}

export default status;
