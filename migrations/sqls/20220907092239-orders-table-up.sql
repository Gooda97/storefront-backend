-- CREATE TABLE orders (
--     id SERIAL PRIMARY KEY,
--     user_id INTEGER NOT NULL REFERENCES users(id)
-- );

-- CREATE TABLE orders_products (
--     order_id INTEGER NOT NULL REFERENCES orders(id),
--     product_id INTEGER NOT NULL REFERENCES products(id),
--     quantity INTEGER NOT NULL
-- );