# Fullstack Login-Signup with JWT Authentication

![Signup](https://github.com/user-attachments/assets/02336dbb-0a62-44de-9de3-72bee15b2725)
![Login](https://github.com/user-attachments/assets/b2af1889-75ef-4a63-92d2-75bfb3f0bab5)
![Main Page](https://github.com/user-attachments/assets/d25f87d0-9de2-4c07-a80e-5602e671a572)
![Inspect Application](https://github.com/user-attachments/assets/af2ccb1e-02f9-4a60-b307-98ebb4d9b0f7)

## Project Overview

This is a full-stack project that implements **JWT-based Authentication** using `access tokens` and `refresh tokens`. The project consists of both the **frontend** and **backend**:

- **Frontend**: Built with `React + Vite`.
- **Backend**: Built with `Node.js`, `Express`, and `Mongoose`. It utilizes packages such as `JWT`, `bcrypt`, and `dotenv` for secure authentication.

### Features:

1. **Signup & Login**: Secure user authentication with JWT tokens.
2. **Access Token & Refresh Token**: Implements short-lived access tokens and longer-lived refresh tokens.
3. **Device ID Validation**: If a new device logs in, the old device is automatically logged out.
4. **Token Expiration**: The access token expires in 1 minute, while the refresh token lasts for 5 minutes.
5. **Protected Routes**: Users can access certain routes only when authenticated.

## Folder Structure

```bash
├── frontend/
│   ├── src/
│   ├── public/
│   └── vite.config.js
├── backend/
│   ├── config/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   └── index.js


## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/MERN-product-crud.git
   
2. Navigate to the project directory:
   ```bash
   cd backend
   npm install

4. Install backend dependencies:
   ```bash
   cd backend
   npm install

6. Install frontend dependencies:
   ```bash
   cd frontend
   npm run dev
