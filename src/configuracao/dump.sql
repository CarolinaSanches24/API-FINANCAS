CREATE DATABASE dindin;

CREATE TABLE usuarios (
    id serial primary key,
    nome varchar(50) NOT NULL,
    email varchar(50) UNIQUE NOT NULL,
    senha varchar(100) NOT NULL
);

CREATE TABLE categorias (
    id serial primary key,
    descricao text UNIQUE NOT NULL
);

CREATE TABLE transacoes(
    id serial primary key,
    tipo text,
    descricao text NOT NULL,
    valor integer NOT NULL,
    data timestamp NOT NULL,
    categoria_id integer not null references categorias(id),
    usuario_id integer not null references usuarios(id),
    
);

INSERT INTO categorias (descricao) 
values ('Alimentação'),
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
('Outras despesas');