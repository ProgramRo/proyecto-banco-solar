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

### Rutas

Para el trabajo, se realizaron las siguientes rutas:

| Ruta | Método | Descripción                                                         |
|------|--------|---------------------------------------------------------------------|
| `/`  | `GET`  | Devuelve la aplicación cliente disponible en el apoyo de la prueba. |
|      |        |                                                                     |
|      |        |                                                                     |

● `/ GET`: Devuelve la aplicación cliente disponible en el apoyo de la prueba.    
● `/usuario POST`: Recibe los datos de un nuevo usuario y los almacena en PostgreSQL.
● `/usuarios GET`: Devuelve todos los usuarios registrados con sus balances.
● `/usuario PUT`: Recibe los datos modificados de un usuario registrado y los actualiza.
● `/usuario DELETE`: Recibe el id de un usuario registrado y lo elimina .
● `/transferencia POST`: Recibe los datos para realizar una nueva transferencia. Se debe ocupar una transacción SQL en la consulta a la base de datos.
● `/transferencias GET`: Devuelve todas las transferencias almacenadas en la base de datos en formato de arreglo.

### Requerimientos para que el programa funcione

● Node.js `v16.14.0`
● PostgreSQL `v14.2`
