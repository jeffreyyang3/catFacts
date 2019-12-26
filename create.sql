DROP SCHEMA IF EXISTS catFactsApi CASCADE;

CREATE SCHEMA catFactsApi;

-- DROP TABLE IF EXISTS users;
-- DROP TABLE IF EXISTS facts;
-- DROP TABLE IF EXISTS texts;

CREATE TABLE users (
  username varchar(50),
  phonenumber varchar(10),
  cellProvider varchar(10),
  userId serial PRIMARY KEY,
  createDate timestamp DEFAULT CURRENT_TIMESTAMP,
  lastUpdate timestamp DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO users (username, phonenumber, cellProvider)
  VALUES ('Rachel', '6268183111', 'Verizon'), ('Jeffrey', '6268182618', 'Verizon'), ('Chris', '5109184345', 'Verizon'), ('Steven', '8587317533', 'Verizon'), ('Lyanna', '4086270411', 'T-Mobile'), ('Olympia', '8586499868', 'T-Mobile');

CREATE TABLE facts (
  factId serial PRIMARY KEY NOT NULL,
  createDate timestamp DEFAULT CURRENT_TIMESTAMP,
  fact varchar(100)
);

CREATE TABLE texts (
  sendDate timestamp DEFAULT CURRENT_TIMESTAMP,
  textId serial PRIMARY KEY,
  userid integer REFERENCES users (userId),
  factid integer NOT NULL REFERENCES facts (factId)
);

