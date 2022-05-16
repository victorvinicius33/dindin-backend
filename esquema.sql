CREATE DATABASE dindin;

DROP TABLE IF EXISTS usuarios;

CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
      nome text NOT NULL,
      email text NOT NULL,
      senha text NOT NULL
);

DROP TABLE IF EXISTS categorias;

CREATE TABLE categorias (
    id SERIAL PRIMARY KEY,
      descricao text NOT NULL
);

DROP TABLE IF EXISTS transacoes;

CREATE TABLE transacoes (
    id SERIAL PRIMARY KEY,
      descricao text,
      valor int NOT NULL,
      data timestamptz NOT NULL,
      categoria_id int NOT NULL REFERENCES categorias(id),
      usuario_id int NOT NULL REFERENCES usuarios(id),
      tipo text NOT NULL
);

INSERT INTO categorias (descricao) VALUES
    ('Alimentação'), ('Assinaturas e Serviços'),
    ('Casa'), ('Mercado'), ('Cuidados Pessoais'),
    ('Educação'), ('Família'), ('Lazer'),
    ('Pets'), ('Presentes'), ('Roupas'),
    ('Saúde'), ('Transporte'), ('Salário'),
    ('Vendas'), ('Outras receitas'), ('Outras despesas');