CREATE TABLE clientes (
    cliente_id SERIAL PRIMARY KEY,
    cliente_nombre VARCHAR(50),
    cliente_apellido VARCHAR(50),
    cliente_nit INT,
    cliente_situacion smallint
);