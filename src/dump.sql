CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL,
  password TEXT NOT NULL
);

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

CREATE TABLE transactions (
  id SERIAL PRIMARY KEY,
  description text,
  amount int NOT NULL,
  date timestamp NOT NULL,
  category_id int NOT NULL REFERENCES categories(id),
  transaction_type VARCHAR(10) NOT NULL,
  user_id int NOT NULL REFERENCES users(id)
);