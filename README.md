# Subscription Tracker

## Description

Subscription Tracker is an application designed for managing user subscriptions. It allows users to add, edit, and delete their subscriptions, as well as track total expenditures and monthly expenses. The application also includes a Telegram bot that offers the same functionality as the website.

## Features

- User registration and authentication.
- Adding new subscriptions with fields for title, price, renewal period, and start date.
- Viewing a list of all user subscriptions.
- Editing existing subscriptions.
- Deleting subscriptions.
- Displaying total subscription expenses.
- Showing expenses for subscriptions in the current month.
- Telegram bot integration with the same features as the website.

## Technologies Used

- **Frontend**: [TypeScript](https://www.typescriptlang.org), [React](https://react.dev), [Redux Toolkit](https://redux-toolkit.js.org), [Tailwind CSS](https://tailwindcss.com).
- **Backend**: [TypeScript](https://www.typescriptlang.org), [Node.js](https://nodejs.org/en), [Express.js](https://expressjs.com), [Mongoose](https://mongoosejs.com), [JWT](https://jwt.io) for authentication.
- **Project Structure**: Client-server application with REST API for communication between frontend and backend.
- **Bot**: Python, [aiogram](https://docs.aiogram.dev/en/v3.1.1/index.html)

## Telegram Integration

If `VITE_WITH_TELEGRAM="true"` a new path `/telegram` will be available in the application, which is just the
`WEBAPP_URL` for the bot. The Telegram connection button will also be displayed in the header. When `VITE_WITH_TELEGRAM="false"` all these functions are not available



## Installation and Running

1. Clone the repository:

```bash
git clone https://github.com/ra1nbow1/subscriptions_tracker.git
cd subscription_tracker
```

2. Install dependencies for both client, server, and bot:

```bash
cd client
npm install

cd ../server
npm install

cd ../bot
npm install
```

3. Create environment files for the bot, server, and project root:

```bash
# /bot/.env
BOT_TOKEN="" # Your Telegram bot token
WEBAPP_URL=".../telegram" # URL where the frontend is hosted (I used netlify)

# /server/api/.env
MONGO_URI="" # Your MongoDB connection string
API_PORT="" # Port for the API server
TOKEN_KEY="" # Key for JWT

# /.env
BACKEND_URL="" # URL where the backend is hosted (I used ngrok)
VITE_WITH_TELEGRAM=true/false # Flag to show if Telegram integration should be enabled
```

4. Start the server and client:

```bash
# Start the server
cd server
npm run dev

# Start the client
cd ../client
npm run dev
```

5. If you want to run the bot, ensure the frontend and backend are hosted. For example, you can use ngrok for the backend:

```bash
ngrok http http://localhost:5555/
```

6. Then, start the bot:
```bash
python bot/main.py
```
