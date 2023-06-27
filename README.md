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

## Queries

- `getUser(id: ID!): User`: Retrieves a user's information by their ID.
- `getVideo(id: ID!): Video`: Retrieves a video's information by its ID.
- `getChannel(id: ID!): Channel`: Retrieves a channel's information by its ID.
- `getTrendingVideos(limit: Int!): [Video]`: Retrieves a list of trending videos, limited by the specified number.
- `getPopularChannels(limit: Int!): [Channel]`: Retrieves a list of popular channels, limited by the specified number.
- `searchVideos(query: String!): [Video]`:Searches for videos based on the provided query string.
- `searchChannels(query: String!): [Channel]`: Searches for channels based on the provided query string.
- `getVideosByChannel(channelId: ID!): [Video]`: Retrieves a list of videos uploaded by a specific channel.
- `getSubscribedChannels(userId: ID!): [Channel]`: Retrieves a list of channels subscribed to by a user.
- `getCommentsByVideo(videoId: ID!): [Comment]`: Retrieves a list of comments for a specific video.
- `getRecommendedVideos(userId: ID!): [Video]`: Retrieves a list of recommended videos based on a user's preferences.
- `getLikedVideos(userId: ID!): [Video]`: Retrieves a list of videos liked by a user.

## Mutations

- `registerUser(input: RegisterUserInput!): AuthPayload`: Registers a new user with the provided user information.
- `loginUser(input: LoginUserInput!): AuthPayload`: Authenticates a user with the provided login credentials.
- `uploadVideo(input: UploadVideoInput!): Video`: Uploads a new video with the provided video information.
- `likeVideo(videoId: ID!): Video`: Likes a video specified by its ID.
- `dislikeVideo(videoId: ID!): Video`: Dislikes a video specified by its ID.
- `addComment(videoId: ID!, input: AddCommentInput!): Comment`: Adds a comment to a video specified by its ID.
- `subscribeToChannel(channelId: ID!): Channel`: Subscribes to a channel specified by its ID.
- `updateUserProfile(input: UpdateUserProfileInput!): User`: Updates the user's profile information with the provided input.
- `updateVideo(videoId: ID!, input: UpdateVideoInput!): Vide`: Updates the information of a specific video specified by its ID.
- `deleteVideo(videoId: ID!): Boolean`: eletes a specific video specified by its ID.
- `deleteComment(commentId: ID!): Boolean`: Deletes a specific comment specified by its ID.
- `createChannel(input: CreateChannelInput!): Channel`: Creates a new channel with the provided channel information.
- `updateChannel(channelId: ID!, input: UpdateChannelInput!): Channel`: Updates the information of a specific channel specified by its ID.
- `deleteChannel(channelId: ID!): Boolean`: Deletes a specific channel specified by its ID.
- `subscribeToPlaylist(playlistId: ID!): Playlist`: Subscribes to a playlist specified by its ID.
- `createPlaylist(input: CreatePlaylistInput!): Playlist`: Creates a new playlist with the provided playlist information.

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
