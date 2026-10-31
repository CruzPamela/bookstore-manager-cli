-- =========================================================
-- BookStore Manager - Banco de dados (PostgreSQL)
-- Ordem: 1) DDL (estrutura)  2) DML (dados)  3) Relatórios
-- =========================================================

-- Limpa as tabelas caso o script seja executado mais de uma vez
DROP TABLE IF EXISTS emprestimos;
DROP TABLE IF EXISTS livros;
DROP TABLE IF EXISTS clientes;
DROP TABLE IF EXISTS autores;

-- =========================================================
-- 1. DDL - CRIAÇÃO DA ESTRUTURA
-- =========================================================

CREATE TABLE autores (
    id            SERIAL PRIMARY KEY,
    nome          VARCHAR(100) NOT NULL,
    nacionalidade VARCHAR(50)  NOT NULL
);

CREATE TABLE livros (
    id                   SERIAL PRIMARY KEY,
    titulo               VARCHAR(150) NOT NULL,
    isbn                 VARCHAR(20)  NOT NULL,
    anoPublicado         INTEGER      NOT NULL CHECK (anoPublicado > 0),
    estado               VARCHAR(10)  NOT NULL CHECK (estado IN ('novo', 'usado')),
    autorId              INTEGER      NOT NULL REFERENCES autores(id),
    quantidadeTotal      INTEGER      NOT NULL CHECK (quantidadeTotal > 0),
    quantidadeDisponivel INTEGER      NOT NULL CHECK (quantidadeDisponivel >= 0),
    UNIQUE (isbn, estado)
);

CREATE TABLE clientes (
    id       SERIAL PRIMARY KEY,
    nome     VARCHAR(100) NOT NULL,
    email    VARCHAR(100) NOT NULL UNIQUE,
    telefone VARCHAR(20)  NOT NULL
);

CREATE TABLE emprestimos (
    id             SERIAL PRIMARY KEY,
    livroId        INTEGER     NOT NULL REFERENCES livros(id),
    clienteId      INTEGER     NOT NULL REFERENCES clientes(id),
    dataEmprestimo DATE        NOT NULL DEFAULT CURRENT_DATE,
    dataDevolucao  DATE,
    status         VARCHAR(10) NOT NULL CHECK (status IN ('ativo', 'devolvido'))
);

-- =========================================================
-- 2. DML - MANIPULAÇÃO DOS DADOS
-- =========================================================

-- INSERT: os mesmos dados do seed da aplicação (src/data/seed.ts)
INSERT INTO autores (nome, nacionalidade) VALUES
    ('Helena Duarte', 'Brasileira'),
    ('Tomás Ferreira', 'Portuguesa'),
    ('Lucía Romero', 'Argentina');

-- quantidadeDisponivel já considera os 2 empréstimos ativos do seed
INSERT INTO livros (titulo, isbn, anoPublicado, estado, autorId, quantidadeTotal, quantidadeDisponivel) VALUES
    ('O Jardim das Horas', '978-0000000001', 2015, 'novo',  1, 3, 2),
    ('O Jardim das Horas', '978-0000000001', 2015, 'usado', 1, 1, 1),
    ('Mares do Sul',       '978-0000000002', 2018, 'novo',  2, 2, 1),
    ('Cidade de Vento',    '978-0000000003', 2020, 'novo',  3, 4, 4),
    ('Noites de Inverno',  '978-0000000004', 2012, 'usado', 2, 1, 1);

INSERT INTO clientes (nome, email, telefone) VALUES
    ('Ana Lima',    'ana@exemplo.com',   '(48) 90000-0001'),
    ('Bruno Reis',  'bruno@exemplo.com', '(48) 90000-0002'),
    ('Carla Souza', 'carla@exemplo.com', '(48) 90000-0003');

INSERT INTO emprestimos (livroId, clienteId, dataEmprestimo, status) VALUES
    (1, 1, '2026-10-31', 'ativo'),
    (3, 2, '2026-10-31', 'ativo');

-- SELECT: conferir os dados inseridos
SELECT * FROM autores;
SELECT * FROM livros;
SELECT * FROM clientes;
SELECT * FROM emprestimos;

-- UPDATE: registrar a devolução do empréstimo 2 (Bruno devolve "Mares do Sul")
UPDATE emprestimos
SET status = 'devolvido', dataDevolucao = '2026-11-01'
WHERE id = 2;

-- ... e devolver o exemplar ao estoque do livro
UPDATE livros
SET quantidadeDisponivel = quantidadeDisponivel + 1
WHERE id = 3;

-- UPDATE: atualizar o telefone de um cliente
UPDATE clientes
SET telefone = '(48) 90000-0099'
WHERE id = 1;

-- DELETE: remover uma cliente sem empréstimos (respeita a FK de emprestimos)
DELETE FROM clientes
WHERE id = 3
  AND id NOT IN (SELECT clienteId FROM emprestimos);

  -- =========================================================
-- 3. CONSULTAS E RELATÓRIOS
-- =========================================================

-- Relatório 1: livros disponíveis (com pelo menos 1 exemplar)
SELECT l.id, l.titulo, l.estado, a.nome AS autor, l.quantidadeDisponivel
FROM livros l
INNER JOIN autores a ON a.id = l.autorId
WHERE l.quantidadeDisponivel > 0
ORDER BY l.titulo;

-- Relatório 2: livros emprestados (empréstimos ativos)
SELECT e.id AS emprestimo, l.titulo, l.estado, c.nome AS cliente, e.dataEmprestimo
FROM emprestimos e
INNER JOIN livros l ON l.id = e.livroId
INNER JOIN clientes c ON c.id = e.clienteId
WHERE e.status = 'ativo'
ORDER BY e.dataEmprestimo;

-- Relatório 3: livros cadastrados por autor (LEFT JOIN mostra autor sem livros também)
SELECT a.nome AS autor, COUNT(l.id) AS total_livros
FROM autores a
LEFT JOIN livros l ON l.autorId = a.id
GROUP BY a.nome
ORDER BY total_livros DESC;

-- Relatório 4: quantidade de empréstimos por livro (inclui livros nunca emprestados)
SELECT l.titulo, l.estado, COUNT(e.id) AS total_emprestimos
FROM livros l
LEFT JOIN emprestimos e ON e.livroId = l.id
GROUP BY l.id, l.titulo, l.estado
ORDER BY total_emprestimos DESC, l.titulo;

-- Relatório 5: clientes com empréstimos ativos
SELECT c.nome AS cliente, c.email, COUNT(e.id) AS emprestimos_ativos
FROM clientes c
INNER JOIN emprestimos e ON e.clienteId = c.id
WHERE e.status = 'ativo'
GROUP BY c.nome, c.email
ORDER BY c.nome;

-- Relatório extra: os 3 livros mais emprestados (LIMIT)
SELECT l.titulo, COUNT(e.id) AS total_emprestimos
FROM livros l
INNER JOIN emprestimos e ON e.livroId = l.id
GROUP BY l.titulo
ORDER BY total_emprestimos DESC
LIMIT 3;

-- Relatório extra: total de exemplares do acervo (função de agregação SUM)
SELECT SUM(quantidadeTotal) AS total_exemplares,
       SUM(quantidadeDisponivel) AS total_disponiveis
FROM livros;