# Contact Management API

A RESTful API for managing contacts with JWT authentication.

## Features

- User authentication (register/login)
- CRUD operations for contacts
- Input validation
- Error handling
- MongoDB database
- JWT authentication
- CORS enabled

## Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd contacts
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory with the following variables:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/contacts_db
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRES_IN=24h
CORS_ORIGIN=http://localhost:3000
```

4. Start the server:
```bash
# Development mode
npm run dev

# Production mode
npm start
```

## API Endpoints

### Authentication

#### Register User
- **POST** `/api/auth/register`
- **Body:**
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123"
  }
  ```

#### Login
- **POST** `/api/auth/login`
- **Body:**
  ```json
  {
    "email": "john@example.com",
    "password": "password123"
  }
  ```

### Contacts

#### Get All Contacts
- **GET** `/api/contacts`
- **Headers:** `Authorization: Bearer <token>`

#### Get Single Contact
- **GET** `/api/contacts/:id`
- **Headers:** `Authorization: Bearer <token>`

#### Create Contact
- **POST** `/api/contacts`
- **Headers:** `Authorization: Bearer <token>`
- **Body:**
  ```json
  {
    "name": "Jane Doe",
    "email": "jane@example.com",
    "phone": "123-456-7890",
    "address": "123 Main St",
    "notes": "Friend from work"
  }
  ```

#### Update Contact
- **PUT** `/api/contacts/:id`
- **Headers:** `Authorization: Bearer <token>`
- **Body:** Same as create contact

#### Delete Contact
- **DELETE** `/api/contacts/:id`
- **Headers:** `Authorization: Bearer <token>`

## Error Handling

The API uses standard HTTP status codes:

- 200: Success
- 201: Created
- 400: Bad Request
- 401: Unauthorized
- 404: Not Found
- 500: Internal Server Error

Error responses include a message and details when applicable:
```json
{
  "message": "Error message",
  "errors": ["Detailed error messages"]
}
```

## Security

- Passwords are hashed using bcrypt
- JWT tokens are used for authentication
- Input validation on all routes
- CORS protection
- Environment variables for sensitive data

## Development

To run the server in development mode with auto-reload:
```bash
npm run dev
```

## Production

For production deployment:
1. Set appropriate environment variables
2. Use `npm start` to run the server
3. Consider using a process manager like PM2
4. Set up proper MongoDB security
5. Use HTTPS
6. Implement rate limiting

## License

ISC 