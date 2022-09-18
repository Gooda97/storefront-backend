# Storefront Backend

## Prepare env
# .env file variables
PORT = 3000
ENV = dev
POSTGRES_HOST = localhost
POSTGRES_PORT = 5432
POSTGRES_DB = my_store
POSTGRES_DB_TEST = my_store_test
POSTGRES_USER = postgres
POSTGRES_PASSWORD = 144991952
PEPPER = bcrypt-pepper
SALT_ROUNDS = 10
TOKEN_SECRET = secret

## Set up

- `yarn add ` to install all dependencies
- CREATE DATABASE my_store;
- CREATE DATABASE my_store_test;
- `yarn up` to migrate up to the database
- `yarn build` to build the app

## Start the app
- `npm run start` to start the app and get access via http://localhost:3000


## Test the app
- `npm run test` to run all tests
