# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API Endpoints
#### Products
- Index `/products` [GET] 
- Create `/products/create` [POST] [token required]
- Read `/products/:id` [GET] [token required]
- Update `/products/:id` [PUT] [token required]
- Delete `/products/:id` [DELETE] [token required]

#### Users
- Index `/users` [GET] [token required]
- Create `/users/create` [POST] 
- Read `/users/:id` [GET] [token required]
- Update `/users/:id` [PUT] [token required]
- Delete `/users/:id` [DELETE] [token required]
- Authinticate `/users/authenticate` [POST]

#### Orders
- Index `/orders` [GET] 
- Create `/orders/create` [POST] [token required]
- Read `/orders/:id` [GET] [token required]
- Update `/orders/:id` [PUT] [token required]
- Delete `/orders/:id` [DELETE] [token required]

## Data Shapes
### users:
-   id: `SERIAL PRIMARY KEY`
-   username: `VARCHAR(20) NOT NULL UNIQUE`
-   first_name: `VARCHAR(20) NOT NULL`
-   last_name: `VARCHAR(20) NOT NULL`
-   password: `VARCHAR(255) NOT NULL`

### products:
-   id: `SERIAL PRIMARY KEY`
-   product_name: `VARCHAR(20) NOT NULL`
-   price: `NUMERIC NOT NULL`

### orders:
-   id: `SERIAL PRIMARY KEY`
    user_id: `INTEGER NOT NULL REFERENCES users(id)`

### orders_products:
-   order_id: `INTEGER NOT NULL REFERENCES orders(id)`
-   product_id: `INTEGER NOT NULL REFERENCES products(id)`
-   quantity: `INTEGER NOT NULL`