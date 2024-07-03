# Subscription Tracker

## Description

Subscription Tracker is an application designed for managing user subscriptions. It allows users to add, edit, and delete their subscriptions, as well as track total expenditures and monthly expenses.

## Features

- User registration and authentication.
- Adding new subscriptions with fields for title, price, renewal period, and start date.
- Viewing a list of all user subscriptions.
- Editing existing subscriptions.
- Deleting subscriptions.
- Displaying total subscription expenses.
- Showing expenses for subscriptions in the current month.

## Technologies Used

- **Frontend**: [TypeScript](https://www.typescriptlang.org), [React](https://react.dev), [Redux Toolkit](https://redux-toolkit.js.org), [Tailwind CSS](https://tailwindcss.com).
- **Backend**: [TypeScript](https://www.typescriptlang.org), [Node.js](https://nodejs.org/en), [Express.js](https://expressjs.com), [Mongoose](https://mongoosejs.com), [JWT](https://jwt.io) for authentication.
- **Project** Structure: Client-server application with REST API for communication between frontend and backend.

## Installation and Running

1. Clone the repository:

```bash
git clone https://github.com/ra1nbow1/subscriptions_tracker.git
cd subscription_tracker
```

2. Install dependencies for both client and server:

```bash
npm install # client

cd ./server/api # server
npm install
```

3. Create /server/api/.env and /.env

```bash
# /server/api/.env
MONGO_URI=""
API_PORT="" # for API server
TOKEN_KEY="" # for JWT


# /.env
ENVIRONMENT="development"
```

4. Start the server and client:

```bash
npm run dev # server

npm run dev # client
```
