# NLW 1st day

Goal: Create backend with node.js

- [x] Create project
- [x] Install Express, Prisma, Typescript
- [x] Config Github OAuth
- [x] Create login route to github
- [x] Create callback route
- [x] User authentication receives access token from github
- [x] Add Message
- [x] Websocket configuration
- [x] Get all messages
- [x] Create user profile
- [x] Create user profile route

## Authentication requirements

- [x] Receive code string
- [x] To recover the access token
- [x] To recover user info from github
- [x] Check if user exists in database
  - If Yes - Generate token
  - If Not - Create user and generate token
- [x] Return token with user info

## Tech Stack

- Typescript
- Axios
- Express
- Jsonwebtoken
- Prisma
- Socket.io
- Dotenv
- ts-node-dev
