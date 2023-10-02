const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: '127.0.0.1',
  database: 'produtoresdb',
  password: 'root123',
  port: 5432,
});

async function testDatabaseConnection() {
  try {
    const client = await pool.connect();
    console.log('Conexão com o banco de dados estabelecida com sucesso!');
    client.release(); // Libera o cliente de volta para o pool
  } catch (error) {
    console.error('Erro ao conectar ao banco de dados:', error);
  } finally {
    // Fecha o pool de conexões após o teste
    await pool.end();
  }
}

testDatabaseConnection();
