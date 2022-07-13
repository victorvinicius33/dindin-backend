CREATE DATABASE dindin;

DROP TABLE IF EXISTS users;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL,
  password text NOT NULL
);

DROP TABLE IF EXISTS categories;

CREATE TABLE categories (
  id SERIAL PRIMARY KEY,
  description VARCHAR(100) NOT NULL
);

INSERT INTO categories (description) 
VALUES
('Alimentação'),
('Assinaturas e Serviços'),
('Casa'),
('Mercado'),
('Cuidados Pessoais'),
('Educação'),
('Família'),
('Lazer'),
('Pets'),
('Presentes'),
('Roupas'),
('Saúde'),
('Transporte'),
('Salário'),
('Vendas'),
('Outras receitas'),
('Outras despesas')
;

DROP TABLE IF EXISTS transactions;

CREATE TABLE transactions (
  id SERIAL PRIMARY KEY,
  description text,
  amount int NOT NULL,
  date timestamptz NOT NULL,
  category_id int NOT NULL REFERENCES categories(id),
  transaction_type text NOT NULL,
  user_id int NOT NULL REFERENCES users(id)
);

INSERT INTO categories (description) VALUES
    ('Alimentação'), ('Assinaturas e Serviços'),
    ('Casa'), ('Mercado'), ('Cuidados Pessoais'),
    ('Educação'), ('Família'), ('Lazer'),
    ('Pets'), ('Presentes'), ('Roupas'),
    ('Saúde'), ('Transporte'), ('Salário'),
    ('Vendas'), ('Outras receitas'), ('Outras despesas');