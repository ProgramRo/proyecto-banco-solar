# PROYECTO 'BANCO SOLAR'

## Descripción
El Banco Solar acaba de decidir invertir una importante suma de dinero para contratar un equipo de desarrolladores Full Stack que desarrollen un nuevo sistema de transferencias, y han anunciado que todo aquel que postule al cargo debe realizar un servidor con Node que utilice PostgreSQL para la gestión y persistencia de datos, y simular un sistema de transferencias.

El sistema debe permitir registrar nuevos usuarios con un balance inicial y basados en éstos, realizar transferencias de saldos entre ellos. En esta prueba contarás con una aplicación cliente preparada para consumir las rutas que deberás crear en el servidor. A continuación se muestra una imagen con la interfaz mencionada.

### Pasos previos
Antes de realizar el trabajo con las diferentes rutas y utilización de aplicación en el front-end, se debe llevar a cabo la creación de la base de datos con los siguientes comandos:

```sql
CREATE DATABASE bancosolar_db;

CREATE TABLE usuarios(id SERIAL PRIMARY KEY, nombre VARCHAR(50), balance FLOAT CHECK(balance >= 0));
CREATE TABLE transferencias(id SERIAL PRIMARY KEY, emisor INT, receptor INT, monto FLOAT, fecha TIMESTAMP, FOREIGN KEY(emisor) REFERENCES usuarios(id), FOREIGN KEY(receptor) REFERENCES usuarios(id));
```
