# Client & User Management Web Application

## Overview

This web application allows for the management of clients and their associated users through CRUD (Create, Read, Update, Delete) operations. The  features of admin control panel for managing all clients and users. The application are Real-time updates ensure that changes made by the admin are immediately reflected for affected users without requiring them to log out and back in.

## Features

### Client Management

1. **Create Client**:  
   - Add new clients using a form capturing details such as Client Name, Industry, Email, Detail and Contact Information.
   - Validate input before saving the client to the database.

2. **Read Clients (List Clients)**:  
   - Display all clients in a table format.
   - Options to view, edit, or delete each client.

3. **Update Client**:  
   - Update existing client details via an edit form.
   - Validate input before saving updates to the database.

4. **Delete Client**:  
   - Delete clients with a confirmation step.

### User Management (Per Client)

1. **Create User**:  
   - Add new users under a specific client using a form capturing details such as Name, Email, Client, Description and Phone Number.
   - Validate input before saving the user to the database.

2. **Read Users (List Users)**:  
   - Display all users associated with a specific client in a table format.
   - Options to view, edit, or delete each user.

3. **Update User**:  
   - Update existing user details via an edit form.
   - Validate input before saving updates to the database.

4. **Delete User**:  
   - Delete users with a confirmation step.

### Admin Control

1. **Admin Privileges**:  
   - Admin users have the ability to manage all clients and users.
   - Admin panel for overseeing all application data and managing clients/users.

2. **Real-Time Updates**:  
   - Changes made by the admin are reflected immediately for affected users without the need to log out.
   - Ensures seamless user experience with real-time data synchronization.


## Usage

1. Start the server:

    ```bash
    cd backend
    nodemon index.js
    ```

    The server will run on `http://localhost:4000`.

2. Start the client:

    ```bash
    cd frontend
    npm start
    ```

    The client will run on `http://localhost:3000`.

## API Endpoints

### admin

- **POST /admin/login**: Admin Login.

### Client

- **GET /client/getAllClient**: Get all Client.
- **POST /client/create**: Add a new Client.
- **GET /client/getSingleClient/:id**: Get client by ID.
- **PUT /client/updateClient/:id**: Update Client by ID.
- **DELETE /client/deleteClient/:id**: Delete Client by ID.

### User

- **GET /user/getAllUser**: Get all User.
- **POST /user/create**: Add a new User.
- **GET /user/getSingleUser/:id**: Get User by ID.
- **PUT /user/updateUser/:id**: Update User by ID.
- **DELETE /user/deleteUser/:id**: Delete User by ID.

## Project Structure

client-user-management/
│
├── backend/                # Server-side code
│   ├── controller/         # Request handlers
│   │   ├── client.js
│   │   └── user.js
|   |   |__ admin.js
│   │
│   ├── models/             # Mongoose models or database schemas
│   │   ├── Client.js
│   │   └── User.js
|   |   |__ Admin.js
│   │
│   ├── routes/             # API routes
│   │   ├── client.js
│   │   └── user.js
|   |   |__ admin.js
│   │
│   ├── .env                # Environment variables
│   └── index.js            # Server initialization
│
├── frontend/               # Client-side code
│   ├── src/                # Source files
│   │   ├── components/     # React components
│   │   │   ├── Dashboard.js
│   │   │   ├── CreateClient.js
│   │   │   ├── CreateUser.js
│   │   │   ├── AllUser.js
│   │   │   └── AllClient.js
|   |   |   |__ Login.js
│   │   │
│   │   ├── App.js          # Main React component
│   │   ├── index.js        # Entry point for React
│   │   └── setupTests.js   # Test setup
│   │
│   ├── public/             # Static files
│   │   └── index.html
│   │
│   ├── .env                # Environment variables for frontend
│   ├── package.json        # Frontend dependencies and scripts
│   └── README.md           # Frontend README

