
const { Pool } = require('pg');

class Service {
  constructor() {
    this.pool = new Pool({
      user: 'postgres',
      host: '127.0.0.1', // ou o IP do seu banco de dados
      database: 'produtoresdb',
      password: 'root123',
      port: 5432, // ou a porta do seu banco de dados
    });
  }

  async criarTabela() {
    const query = `CREATE TABLE produtores (
        id SERIAL PRIMARY KEY,
        cpf_cnpj VARCHAR(255) NOT NULL,
        nome VARCHAR(255) NOT NULL,
        nome_fazenda VARCHAR(255) NOT NULL,
        cidade VARCHAR(255) NOT NULL,
        estado VARCHAR(255) NOT NULL,
        area_total NUMERIC NOT NULL,
        area_agricultavel NUMERIC NOT NULL,
        area_vegetacao NUMERIC NOT NULL,
        culturas TEXT[]
      )`;
    
    try {
      const result = await this.pool.query(query);
      console.log(result);
    } catch (error) {
      throw error;
    }
  }

  async criarProdutorRural(produtor) {
    const { cpfCnpj, nome, nomeFazenda, cidade, estado, areaTotal, areaAgricultavel, areaVegetacao, culturas } = produtor;
    const query = 'INSERT INTO produtores (cpf_cnpj, nome, nome_fazenda, cidade, estado, area_total, area_agricultavel, area_vegetacao, culturas) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *';
    areaTotal = parseFloat(areaAgricultavel) + parseFloat(areaVegetacao);
    const values = [cpfCnpj, nome, nomeFazenda, cidade, estado, areaTotal, areaAgricultavel, areaVegetacao, culturas];
  
    try {
      await this.checarTabela();
      const result = await this.pool.query(query, values);
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  }

  async atualizarProdutorRural(id, produtor) {

    const { cpfCnpj, nome, nomeFazenda, cidade, estado, areaTotal, areaAgricultavel, areaVegetacao, culturas } = produtor;
    const query = 'UPDATE produtores SET cpf_cnpj = $1, nome = $2, nome_fazenda = $3, cidade = $4, estado = $5, area_total = $6, area_agricultavel = $7, area_vegetacao = $8, culturas = $9 WHERE id = $10 RETURNING *';
    const values = [cpfCnpj, nome, nomeFazenda, cidade, estado, areaTotal, areaAgricultavel, areaVegetacao, culturas, id];
    try {
      await this.checarTabela();
      const result = await this.pool.query(query, values);
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  }

  async removerProdutorRural(id) {
    const query = 'DELETE FROM produtores WHERE id = $1';
    const values = [id];
  
    try {
      await this.checarTabela();
      await this.pool.query(query, values);
    } catch (error) {
      throw error;
    }
  } 

  async obterProdutoresRurais() {
    const query = 'SELECT * FROM produtores';
    try {
      await this.checarTabela();
      const result = await this.pool.query(query);
      return result.rows;
    } catch (error) {
      throw error;
    }
  }

  async obterProdutorRural(id) {
    const query = 'SELECT * FROM produtores WHERE id = $1';
    const values = [id];
  
    try {
      await this.checarTabela();
      const result = await this.pool.query(query, values);
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  }

  async checarTabela() {
    const query = `SELECT EXISTS (
      SELECT 1
      FROM information_schema.tables
      WHERE table_name = 'produtores'
    )`;
  
    try {
      const result = await this.pool.query(query);
      if (!result.rows[0].exists) {
        await this.criarTabela();
      }
    } catch (error) {
      throw error;
    }
  }
}

module.exports = { Service };