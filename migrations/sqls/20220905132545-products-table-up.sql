CREATE TABLE products(id SERIAL PRIMARY KEY,
    product_name VARCHAR(20) NOT NULL,
    price NUMERIC NOT NULL,
    product_type VARCHAR(20));