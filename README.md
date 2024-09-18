# E-Commerce Project Using Node.js
Simple e-commerce backend project in Nodejs.
## Tools
This project uses:
- Nodejs for the backend environment.
- Expressjs for handling routing and middleware.
- NoSQL database (MongoDB) to store data, such as user or product data.
- Mongoose (an Object Data Modelling library for MongoDB) for:
    -   `{ Schema, model } for defining the models.
 
## Installation and Setup
1. Clone repository

   ```bash
    git clone https://github.com/nour-abdulnasser/ecommerce_nodejs.git
    ```
   
2. Install dependencies

    ```bash
   npm i
   ```
    
3. Run the server.
   
   ```bash
   nodemon
   ```

   OR

   ```bash
   npm start
   ```

## Usage
- **MongoDB connection**: The database is connected using the default local MongoDB URI: `mongodb://localhost:27017/e-commerce`.
- **API access**: The API can be accessed at `http://localhost:3000/api/`. 
  - _Note_: The `.env` file is not included yet, so the ports and other configuration settings are defined directly in the code.

   
