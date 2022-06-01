-- Creación de DB
CREATE DATABASE bancosolar_db;

-- Creación de tablas
CREATE TABLE usuarios(id SERIAL PRIMARY KEY, nombre VARCHAR(50), balance FLOAT CHECK(balance >= 0));
CREATE TABLE transferencias(id SERIAL PRIMARY KEY, emisor INT, receptor INT, monto FLOAT, fecha TIMESTAMP, FOREIGN KEY(emisor) REFERENCES usuarios(id), FOREIGN KEY(receptor) REFERENCES usuarios(id));

--Se agregan registros para ver si la conexión es correcta
INSERT INTO usuarios(nombre, balance) VALUES('Leandro Rodriguez', 200000);
INSERT INTO usuarios(nombre, balance) VALUES('Lissandra Ice', 210000);