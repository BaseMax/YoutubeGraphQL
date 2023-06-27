# YouTube Clone GraphQL API

This project is a GraphQL-based API for a YouTube clone. It allows users to perform various operations related to videos, channels, and user interactions. The API is implemented using TypeScript and leverages the power and flexibility of GraphQL for efficient data retrieval and manipulation.

## Features

- User registration and authentication
- Video upload and management
- Like, dislike, and comment on videos
- Subscribe to Channels
- Search for videos and channels
- Trending videos and popular channels
- User profile management

## Technologies Used

The following technologies and tools are used in this project:

- GraphQL: A query language for APIs that provides a flexible and efficient approach to data retrieval and manipulation.
- TypeScript: A statically typed superset of JavaScript that helps in building robust and scalable applications.
- Node.js: A JavaScript runtime environment that allows running JavaScript code outside of a browser.
- Express.js: A web application framework for Node.js that simplifies building APIs and web applications.
- MongoDB: A NoSQL database used for storing and retrieving data efficiently.
- Mongoose: An Object Data Modeling (ODM) library for MongoDB and Node.js that provides a straightforward schema-based solution for modeling application data.
- Apollo Server: A community-driven, open-source GraphQL server that integrates with various Node.js frameworks.
- JWT: JSON Web Tokens are used for user authentication and authorization.
- Docker: A containerization platform that enables easy deployment and scalability of applications.

## Installation

Clone the repository:

```bash
git clone https://github.com/BaseMax/YoutubeGraphQL.git
```

Navigate to the project directory:

```bash
cd YoutubeGraphQL
```

Install the dependencies:

```bash
npm install
```

Set up the environment variables:

Create a `.env` file in the project root.

Define the required environment variables in the .env file. For example:

```makefile
PORT=3000
MONGODB_URL=mongodb://localhost:27017/youtube-clone
AWS_ACCESS_KEY_ID=your-access-key-id
AWS_SECRET_ACCESS_KEY=your-secret-access-key
AWS_BUCKET_NAME=your-bucket-name
JWT_SECRET=your-jwt-secret
```

Start the development server:

```bash
npm run dev
```

This will start the server at http://localhost:3000.

## Usage

You can use tools like Postman or Insomnia to interact with the API.

Access the GraphQL Playground by navigating to http://localhost:3000/graphql in your browser.

## API Reference

The API documentation and usage examples can be found in the API Reference file.

## Contributing

Contributions to this project are welcome. To contribute, please follow these steps:

## License

This project is licensed under the GPL-3.0 License.

Copyright 2023, Max Base
